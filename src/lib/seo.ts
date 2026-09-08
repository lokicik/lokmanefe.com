export const site = {
  url: "https://www.lokmanefe.com",
  name: "Lokman Efe",
  fullName: "Lokman Baturay Efe",
  title: "Lokman Efe (Lokman Baturay Efe) | Software Engineer",
  jobTitle: "Software Engineer",
  description:
    "Lokman Baturay Efe, known professionally as Lokman Efe, is a software engineer in Turkey building SaaS products, AI/RAG systems, and API integrations.",
  biography:
    "I'm Lokman Baturay Efe, known professionally as Lokman Efe, a software engineer based in Turkey.",
  portrait: "/images/lokman-baturay-efe.jpg",
  email: "lokmanbefe@gmail.com",
  profiles: [
    { label: "GitHub", href: "https://github.com/lokicik" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lokmanefe/" },
    { label: "LeetCode", href: "https://leetcode.com/u/lokmanefe/" },
    { label: "Kaggle", href: "https://www.kaggle.com/lokmanefe/" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export const person = {
  "@type": "Person",
  "@id": absoluteUrl("/#person"),
  name: site.fullName,
  alternateName: site.name,
  url: absoluteUrl(),
  image: absoluteUrl(site.portrait),
  jobTitle: site.jobTitle,
  description: site.description,
  sameAs: site.profiles.map((profile) => profile.href),
};

export function socialImage(title: string) {
  return {
    url: absoluteUrl(`/og?${new URLSearchParams({ title })}`),
    width: 1200,
    height: 630,
    alt: `${title} | ${site.name}`,
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
