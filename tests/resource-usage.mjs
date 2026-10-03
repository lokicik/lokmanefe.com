// After `next build` and starting the production server:
// node tests/resource-usage.mjs http://localhost:3191
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import matter from "gray-matter";

const require = createRequire(import.meta.url);
const { hasRemoteMatch } = require("next/dist/shared/lib/match-remote-pattern");
const baseUrl = process.argv[2] ?? "http://localhost:3191";
const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
const { config } = JSON.parse(await readFile(".next/required-server-files.json", "utf8"));
const routes = new Map(Object.entries(manifest.routes).map(([key, value]) => [decodeURIComponent(key), value]));

async function markdown(directory) {
  const files = await readdir(directory).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  return Promise.all(files.filter((file) => file.endsWith(".md")).map(async (file) => ({
    slug: file.slice(0, -3),
    ...matter(await readFile(`${directory}/${file}`, "utf8")).data,
  })));
}

const books = await markdown("content/books");
const writings = (await Promise.all([
  markdown("content/writing/articles"), markdown("content/writing/stories"),
])).flat();
const published = writings.filter((post) => post.published !== false);
const listed = published.filter((post) => post.listed !== false);
const titles = [...new Set(["Lokman Efe", "Writing", "Reading", ...published.map((post) => post.title), ...books.map((book) => book.title)])];

async function get(path, expectedStatus = 200) {
  const response = await fetch(`${baseUrl}${path}`, { headers: { "User-Agent": "Twitterbot" } });
  assert.equal(response.status, expectedStatus, path);
  return response;
}

function staticRoute(path) {
  assert.ok(routes.has(path), `Missing prerendered route: ${path}`);
  assert.equal(routes.get(path).initialRevalidateSeconds, false, `Timed revalidation remains: ${path}`);
}

for (const path of ["/", "/rss", "/sitemap.xml", ...published.map((post) => `/writing/${post.slug}`), ...books.map((book) => `/reading/${book.slug}`), ...titles.map((title) => `/og/${title}`)]) {
  staticRoute(path);
}
for (const path of ["/writing/[slug]", "/reading/[slug]", "/og/[title]"]) {
  assert.equal(manifest.dynamicRoutes[path].fallback, false, `${path} must reject unknown paths`);
}
for (const path of ["/writing", "/reading", "/og"]) assert.ok(!routes.has(path), `${path} must retain dynamic behavior`);

const rss = await (await get("/rss")).text();
const sitemap = await (await get("/sitemap.xml")).text();
assert.equal(rss, await (await get("/rss")).text());
assert.equal(sitemap, await (await get("/sitemap.xml")).text());
assert.equal([...rss.matchAll(/<item>/g)].length, listed.length + books.length);
assert.equal([...sitemap.matchAll(/<url>/g)].length, listed.length + books.length + 3);

// Content dates, never checkout timestamps or now. Full dates only: a reading
// year is not enough information to invent an exact RSS publication date.
const datedValues = [...listed.flatMap((post) => [post.date, post.lastModified]), ...books.flatMap((book) => [book.lastModified, book.completionDate || book.completedDate, book.startDate])]
  .filter((value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value))
  .map((value) => new Date(value).getTime()).filter(Number.isFinite);
const expectedBuildDate = new Date(Math.max(...datedValues)).toUTCString();
assert.ok(rss.includes(`<lastBuildDate>${expectedBuildDate}</lastBuildDate>`));

for (const post of writings) {
  const path = `/writing/${post.slug}`;
  const visible = post.published !== false && post.listed !== false;
  assert.equal(rss.includes(`https://www.lokmanefe.com${path}</link>`), visible, `RSS visibility: ${path}`);
  assert.equal(sitemap.includes(`https://www.lokmanefe.com${path}</loc>`), visible, `Sitemap visibility: ${path}`);
  const html = await (await get(path, post.published === false ? 404 : 200)).text();
  if (post.published !== false) {
    const imageUrl = `https://www.lokmanefe.com/og/${encodeURIComponent(post.title)}`;
    assert.ok(html.includes(`property="og:image" content="${imageUrl}"`), `OG metadata: ${path}`);
    assert.ok(html.includes(`name="twitter:image" content="${imageUrl}"`), `Twitter metadata: ${path}`);
    assert.ok(html.includes(`rel="canonical" href="https://www.lokmanefe.com${path}"`));
  }
}
await get("/writing/not-a-real-resource-usage-test-post", 404);
await get("/reading/not-a-real-resource-usage-test-book", 404);
await get("/og/not-a-real-resource-usage-test-title", 404);

// Every declared image exists, including punctuation and non-ASCII titles.
for (let start = 0; start < titles.length; start += 8) {
  await Promise.all(titles.slice(start, start + 8).map(async (title) => {
    const response = await get(`/og/${encodeURIComponent(title)}`);
    assert.match(response.headers.get("content-type"), /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }));
}
for (const title of ["Reading", "Do Androids Dream of Electric Sheep?", published[0].title]) {
  const legacy = await get(`/og?${new URLSearchParams({ title })}`);
  assert.match(legacy.headers.get("cache-control"), /s-maxage=86400/);
  const expected = Buffer.from(await (await get(`/og/${encodeURIComponent(title)}`)).arrayBuffer());
  assert.deepEqual(Buffer.from(await legacy.arrayBuffer()), expected, `Legacy OG appearance: ${title}`);
}
assert.match((await get("/og?title=An%20arbitrary%20legacy%20title")).headers.get("content-type"), /image\/png/);

function structuredData(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}
const writingHtml = await (await get("/writing?q=Process+Lasso&filter=article&year=2026")).text();
const writingData = structuredData(writingHtml).find((data) => data.mainEntity?.blogPost);
assert.equal(writingData.mainEntity.blogPost.length, 1);
assert.match(writingData.mainEntity.blogPost[0].headline, /Process Lasso/);
const readingHtml = await (await get("/reading?q=1984&status=all&year=2020")).text();
const readingData = structuredData(readingHtml).find((data) => data.mainEntity?.itemListElement);
assert.equal(readingData.mainEntity.numberOfItems, 1);
assert.equal(readingData.mainEntity.itemListElement[0].item.name, "1984");
for (const [path, html] of [["/writing", writingHtml], ["/reading", readingHtml]]) {
  assert.ok(html.includes(`rel="canonical" href="https://www.lokmanefe.com${path}"`), `${path} canonical`);
}

const covers = books.filter((book) => book.coverImage);
for (const book of covers) assert.ok(hasRemoteMatch([], config.images.remotePatterns, new URL(book.coverImage)), `Cover blocked: ${book.slug}`);
assert.ok(!hasRemoteMatch([], config.images.remotePatterns, new URL("https://example.com/arbitrary.jpg")));
assert.equal(config.images.unoptimized, false);
assert.equal(config.images.minimumCacheTTL, 604800);
assert.deepEqual(config.images.formats, ["image/webp"]);
assert.deepEqual(config.images.deviceSizes, [640, 750, 828, 1080, 1200, 1920, 2048, 3840]);
assert.deepEqual(config.images.imageSizes, [16, 32, 48, 64, 96, 128, 256, 384]);
console.log(JSON.stringify({
  result: "PASS", publishedWritings: published.length, listedWritings: listed.length,
  books: books.length, staticSocialImages: titles.length,
  allowedCovers: covers.length, coverHosts: new Set(covers.map((book) => new URL(book.coverImage).hostname)).size,
  rssLastBuildDate: expectedBuildDate,
  checks: ["build-time routes", "404 and publication rules", "RSS/sitemap", "OG PNGs and legacy byte equivalence", "filtered archive SEO", "image source coverage"],
}, null, 2));
