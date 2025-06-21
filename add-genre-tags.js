const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const booksDirectory = path.join("content", "books");

// Genre mapping based on titles, authors, and common book classifications
const genreRules = [
  // Science Fiction
  {
    pattern:
      /(dune|foundation|hitchhiker|time machine|end of eternity|genesis)/i,
    tags: ["science-fiction", "fiction"],
  },
  {
    pattern: /brave new world/i,
    tags: ["science-fiction", "dystopian", "fiction"],
  },
  {
    pattern: /1984|nineteen eighty/i,
    tags: ["dystopian", "political", "fiction"],
  },

  // Fantasy
  {
    pattern:
      /(harry potter|lord of the rings|fellowship|two towers|return of the king|silmarillion)/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern: /(game of thrones|graceling|fire|bitterblue)/i,
    tags: ["fantasy", "fiction"],
  },
  {
    pattern:
      /(rangers apprentice|ruins of gorlan|burning bridge|icebound land|oakleaf bearers|siege of macindaw|eraks ransom|kings of clonmel|halts peril|emperor of nihon|lost stories|royal ranger|outcasts|invaders|hunters|slaves of socorro|scorpion mountain)/i,
    tags: ["fantasy", "young-adult", "fiction"],
  },
  { pattern: /six of crows/i, tags: ["fantasy", "young-adult", "fiction"] },

  // Young Adult
  {
    pattern:
      /(diary of a wimpy kid|darkest minds|afterlight|through the dark)/i,
    tags: ["young-adult", "fiction"],
  },
  {
    pattern: /timeriders/i,
    tags: ["young-adult", "science-fiction", "fiction"],
  },

  // Classic Literature
  {
    pattern:
      /(great gatsby|tale of two cities|lord of the flies|trial|stranger)/i,
    tags: ["classic", "fiction"],
  },
  {
    pattern: /(no longer human|madonna in a fur coat|my sweet orange tree)/i,
    tags: ["classic", "fiction"],
  },
  {
    pattern:
      /(siddhartha|thus spoke zarathustra|beyond good and evil|ecce homo)/i,
    tags: ["philosophy", "classic"],
  },

  // Philosophy
  {
    pattern: /(nietzsche|zarathustra|sokrates|socrates)/i,
    tags: ["philosophy"],
  },
  { pattern: /art of war/i, tags: ["philosophy", "strategy", "classic"] },

  // Non-fiction
  {
    pattern:
      /(sapiens|brief history of time|guns germs steel|third chimpanzee)/i,
    tags: ["non-fiction", "history", "science"],
  },
  {
    pattern: /(atomic habits|100 startup|pragmatic programmer)/i,
    tags: ["non-fiction", "self-help", "business"],
  },
  {
    pattern: /machine learning book/i,
    tags: ["non-fiction", "technology", "programming"],
  },
  {
    pattern: /(kozmos|bilim kitabi|ayin arka yuzu)/i,
    tags: ["non-fiction", "science"],
  },

  // Mystery/Thriller
  { pattern: /da vinci code/i, tags: ["mystery", "thriller", "fiction"] },
  { pattern: /midnight library/i, tags: ["fiction", "contemporary"] },

  // Turkish Literature
  {
    pattern:
      /(kuyucakli yusuf|puslu kitalar|su cilgin turkler|turklerin tarihi|osmancik|simdiki cocuklar)/i,
    tags: ["turkish-literature", "fiction"],
  },

  // Dystopian
  { pattern: /clockwork orange/i, tags: ["dystopian", "fiction", "classic"] },

  // Magical Realism
  {
    pattern: /(hundred years of solitude|chronicle of a death)/i,
    tags: ["magical-realism", "fiction", "classic"],
  },

  // Endgame series
  {
    pattern: /endgame.*rules/i,
    tags: ["young-adult", "science-fiction", "fiction"],
  },

  // Multiversum series
  {
    pattern: /(multiversum|memoria)/i,
    tags: ["science-fiction", "young-adult", "fiction"],
  },
];

function determineGenres(title, author) {
  const tags = new Set();

  // Check against genre rules
  for (const rule of genreRules) {
    if (rule.pattern.test(title) || rule.pattern.test(author)) {
      rule.tags.forEach((tag) => tags.add(tag));
    }
  }

  // Default to fiction if no specific genre found and it's not clearly non-fiction
  if (
    tags.size === 0 &&
    !/(history|science|programming|business|self-help|philosophy)/.test(
      title.toLowerCase()
    )
  ) {
    tags.add("fiction");
  }

  return Array.from(tags);
}

function updateBookTags() {
  try {
    const files = fs.readdirSync(booksDirectory);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    let updatedCount = 0;

    for (const file of markdownFiles) {
      const filePath = path.join(booksDirectory, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data, content: markdownContent } = matter(content);

      // Only update if tags array is empty
      if (!data.tags || data.tags.length === 0) {
        const newTags = determineGenres(data.title || "", data.author || "");

        if (newTags.length > 0) {
          data.tags = newTags;

          const updatedContent = matter.stringify(markdownContent, data);
          fs.writeFileSync(filePath, updatedContent);

          console.log(`✓ Updated ${file}: [${newTags.join(", ")}]`);
          updatedCount++;
        }
      }
    }

    console.log(`\n✅ Updated ${updatedCount} books with genre tags!`);
    console.log("\nGenre distribution:");

    // Show genre distribution
    const allTags = {};
    for (const file of markdownFiles) {
      const filePath = path.join(booksDirectory, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);

      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag) => {
          allTags[tag] = (allTags[tag] || 0) + 1;
        });
      }
    }

    Object.entries(allTags)
      .sort(([, a], [, b]) => b - a)
      .forEach(([tag, count]) => {
        console.log(`  ${tag}: ${count} books`);
      });
  } catch (error) {
    console.error("Error updating tags:", error);
  }
}

updateBookTags();
