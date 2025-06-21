const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const booksDirectory = path.join("content", "books");

/*──────────────── helpers ────────────────*/
const normalize = (s) =>
  s
    .replace(/[-_]+/g, " ") // dashes / underscores → space
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim() // tidy ends
    .toLowerCase(); // case-insensitive match base

/*─────────────── 2-tag rules ─────────────*/
const typeRules = [
  { pattern: /\b1984\b/i, tags: ["dystopian", "fiction"] },
  { pattern: /\ba brief history of time\b/i, tags: ["science", "non-fiction"] },
  { pattern: /\ba clash of kings\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\ba clockwork orange\b/i, tags: ["dystopian", "fiction"] },
  { pattern: /\ba dance with dragons\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\ba feast for crows\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\ba game of thrones\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\ba storm of swords\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\ba tale of two cities\b/i, tags: ["classic", "fiction"] },
  { pattern: /\baltered carbon\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bamok\b/i, tags: ["classic", "fiction"] },
  { pattern: /\banimal farm\b/i, tags: ["dystopian", "fiction"] },
  { pattern: /\batomic habits\b/i, tags: ["self-help", "non-fiction"] },
  { pattern: /\bayin arka yuzu\b/i, tags: ["science", "non-fiction"] },
  { pattern: /\bbeyond good and evil\b/i, tags: ["philosophy", "non-fiction"] },
  { pattern: /\bbilim kitabi ciltli\b/i, tags: ["science", "non-fiction"] },
  { pattern: /\bbitterblue\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bbrave new world\b/i, tags: ["dystopian", "fiction"] },
  {
    pattern: /\bcabin fever diary of a wimpy kid 6\b/i,
    tags: ["children", "fiction"],
  },
  { pattern: /\bchapterhouse dune\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bchildren of dune\b/i, tags: ["science-fiction", "fiction"] },
  {
    pattern: /\bchronicle of a death foretold\b/i,
    tags: ["magical-realism", "fiction"],
  },
  {
    pattern: /\bcomputer system architecture\b/i,
    tags: ["technology", "non-fiction"],
  },
  { pattern: /\bdevil inside us\b/i, tags: ["horror", "fiction"] },
  { pattern: /\bdiary of a wimpy kid\b/i, tags: ["children", "fiction"] },
  {
    pattern: /\bdog days diary of a wimpy kid 4\b/i,
    tags: ["children", "fiction"],
  },
  { pattern: /\bdune messiah\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bdune\b/i, tags: ["science-fiction", "fiction"] },
  {
    pattern: /\bdunyanin en gizli 100 deneyi\b/i,
    tags: ["science", "non-fiction"],
  },
  { pattern: /\becce homo\b/i, tags: ["philosophy", "non-fiction"] },
  {
    pattern: /\bendgame rules of the game\b/i,
    tags: ["young-adult", "fiction"],
  },
  { pattern: /\bendgame sky key\b/i, tags: ["young-adult", "fiction"] },
  { pattern: /\bendgame the calling\b/i, tags: ["young-adult", "fiction"] },
  { pattern: /\beraks ransom\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bfire\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bgenesis\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bgod emperor of dune\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bgraceling\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bguns germs and steel\b/i, tags: ["history", "non-fiction"] },
  { pattern: /\bhalts peril\b/i, tags: ["fantasy", "fiction"] },
  {
    pattern: /\bharry potter and the chamber of secrets\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the cursed child\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the deathly hallows\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the goblet of fire\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the half blood prince\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the order of the phoenix\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the philosophers stone\b/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /\bharry potter and the prisoner of azkaban\b/i,
    tags: ["fantasy", "fiction"],
  },
  { pattern: /\bheretics of dune\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bin the afterlight\b/i, tags: ["young-adult", "fiction"] },
  { pattern: /\bkozmos\b/i, tags: ["science", "non-fiction"] },
  { pattern: /\bkuyucakli yusuf\b/i, tags: ["classic", "fiction"] },
  { pattern: /\blord of the flies\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bmadonna in a fur coat\b/i, tags: ["classic", "fiction"] },
  {
    pattern: /\bmaster zacharius gil braltar a drama in the air\b/i,
    tags: ["classic", "fiction"],
  },
  { pattern: /\bmemoria\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bmultiversum\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bmy sweet orange tree\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bno longer human\b/i, tags: ["classic", "fiction"] },
  { pattern: /\boakleaf bearers\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\boasis\b/i, tags: ["novel", "fiction"] },
  {
    pattern: /\bone hundred years of solitude\b/i,
    tags: ["magical-realism", "fiction"],
  },
  { pattern: /\bosmancik\b/i, tags: ["historical-fiction", "fiction"] },
  { pattern: /\bpuslu kitalar atlasi\b/i, tags: ["fantasy", "fiction"] },
  {
    pattern: /\brodrick rules diary of a wimpy kid 2\b/i,
    tags: ["children", "fiction"],
  },
  { pattern: /\bruin and rising\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bsapiens\b/i, tags: ["history", "non-fiction"] },
  { pattern: /\bscorpion mountain\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bshadow and bone\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bsiddhartha\b/i, tags: ["philosophy", "fiction"] },
  { pattern: /\bsiege and storm\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bsimdiki cocuklar harika\b/i, tags: ["children", "fiction"] },
  { pattern: /\bsix of crows\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bslaves of socorro\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bsokratesin savunmasi\b/i, tags: ["philosophy", "non-fiction"] },
  { pattern: /\bsu cilgin turkler\b/i, tags: ["history", "non-fiction"] },
  { pattern: /\b100 startup\b/i, tags: ["business", "non-fiction"] },
  { pattern: /\bthe alchemist\b/i, tags: ["philosophy", "fiction"] },
  { pattern: /\bthe art of war\b/i, tags: ["strategy", "non-fiction"] },
  { pattern: /\bthe burning bridge\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe catcher in the rye\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe crime trade\b/i, tags: ["thriller", "fiction"] },
  {
    pattern: /\bthe curious case of benjamin button\b/i,
    tags: ["classic", "fiction"],
  },
  { pattern: /\bthe da vinci code\b/i, tags: ["thriller", "fiction"] },
  {
    pattern: /\bthe darkest minds never fade\b/i,
    tags: ["young-adult", "fiction"],
  },
  { pattern: /\bthe darkest minds\b/i, tags: ["young-adult", "fiction"] },
  { pattern: /\bthe devils disciple\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe emperor of nihon ja\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe end of eternity\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bthe fellowship of the ring\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe grapes of wrath\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe great gatsby\b/i, tags: ["classic", "fiction"] },
  {
    pattern: /\bthe hitchhikers guide to the galaxy\b/i,
    tags: ["science-fiction", "fiction"],
  },
  {
    pattern: /\bthe hundred page machine learning book\b/i,
    tags: ["technology", "non-fiction"],
  },
  { pattern: /\bthe hunters\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe icebound land\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe idiot\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe invaders\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe journey to the east\b/i, tags: ["philosophy", "fiction"] },
  { pattern: /\bthe kings of clonmel\b/i, tags: ["fantasy", "fiction"] },
  {
    pattern: /\bthe last straw diary of a wimpy kid 3\b/i,
    tags: ["children", "fiction"],
  },
  { pattern: /\bthe little prince\b/i, tags: ["children", "fiction"] },
  { pattern: /\bthe lost stories\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe midnight library\b/i, tags: ["contemporary", "fiction"] },
  { pattern: /\bthe outcasts\b/i, tags: ["fantasy", "fiction"] },
  {
    pattern: /\bthe pragmatic programmer\b/i,
    tags: ["technology", "non-fiction"],
  },
  { pattern: /\bthe return of the king\b/i, tags: ["fantasy", "fiction"] },
  {
    pattern: /\bthe royal ranger a new beginning\b/i,
    tags: ["fantasy", "fiction"],
  },
  { pattern: /\bthe ruins of gorlan\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe rule of knowledge\b/i, tags: ["thriller", "fiction"] },
  { pattern: /\bthe siege of macindaw\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe silmarillion\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe sorcerer of the north\b/i, tags: ["fantasy", "fiction"] },
  { pattern: /\bthe stranger\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe third chimpanzee\b/i, tags: ["science", "non-fiction"] },
  {
    pattern: /\bthe third wheel diary of a wimpy kid 7\b/i,
    tags: ["children", "fiction"],
  },
  { pattern: /\bthe three musketeers\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe time machine\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bthe trial\b/i, tags: ["classic", "fiction"] },
  { pattern: /\bthe two towers\b/i, tags: ["fantasy", "fiction"] },
  {
    pattern: /\bthe ugly truth diary of a wimpy kid 5\b/i,
    tags: ["children", "fiction"],
  },
  { pattern: /\bthrough the dark\b/i, tags: ["young-adult", "fiction"] },
  {
    pattern: /\bthus spoke zarathustra\b/i,
    tags: ["philosophy", "non-fiction"],
  },
  { pattern: /\btimeriders\b/i, tags: ["science-fiction", "fiction"] },
  { pattern: /\bturklerin tarihi 2\b/i, tags: ["history", "non-fiction"] },
  { pattern: /\bturklerin tarihi\b/i, tags: ["history", "non-fiction"] },
  { pattern: /\butopia\b/i, tags: ["philosophy", "fiction"] },
  {
    pattern: /\bwhat men live by and other tales\b/i,
    tags: ["classic", "fiction"],
  },
  { pattern: /\byou dont know js\b/i, tags: ["technology", "non-fiction"] },
];

/*──────── determineTags with normalization ────────*/
function determineTags(rawTitle) {
  const title = normalize(rawTitle);
  for (const rule of typeRules) {
    if (rule.pattern.test(title)) return rule.tags;
  }
  return ["novel", "fiction"]; // should never hit, but safe
}

/*──────── batch updater ─────────────*/
function updateBookTags() {
  const files = fs.readdirSync(booksDirectory).filter((f) => f.endsWith(".md"));
  let updated = 0;

  for (const file of files) {
    const filePath = path.join(booksDirectory, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);

    const fileTitle = parsed.data.title || file.replace(/\.md$/, "");
    parsed.data.tags = determineTags(fileTitle);

    fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    console.log(`✓ ${file}: [${parsed.data.tags.join(", ")}]`);
    updated++;
  }

  console.log(`\n✅ Updated ${updated} files.`);
}

updateBookTags();
