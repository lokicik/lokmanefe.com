const isbn = require("node-isbn");
const fs = require("fs");
const path = require("path");

// List of ISBNs
const books = [
  "9780553803709",
  "9780586057247",
  "9781857983364",
  "9780385081047",
  "9780385416276",
  "9780586008355",
  "9780307792402",
  "9780307490247",
  "9780586062005",
  "9780765319142",
  "9780553293418",
  "9780593160046",
  "9780441569595",
  "9780441013678",
  "9780553281743",
  "9780060539825",
  "9780553294613",
  "9780140157727",
  "9780141910017",
  "9780425190449",
  "9780425198681",
  "9780399154300",
  "9781101443316",
  "9780553283686",
  "0553288202",
  "9780553572940",
  "9780575076402",
  "5998507916",
  "9780553380958",
  "9780553380965",
  "9780061792571",
  "9780062190376",
  "9780061474095",
  "9780380977420",
  "9780099410690",
  "9780434011773",
  "9780441003709",
  "9781497686519",
  "9780553099584",
  "9780345404473",
  "9781857988536",
  "9780679740674",
  "9780575076815",
  "9780679734468",
  "9780679734451",
  "9780679734444",
  "9781473221628",
  "9783548606118",
  "9780553278224",
  "9780330514019",
  "9780345253569",
  "9780007115860",
  "9780451457998",
  "9780345413970",
  "9780586203194",
  "9780345438201",
  "9781857231588",
  "9782290032046",
  "9781857230215",
  "9781857232523",
];

// Function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Function to format authors
function formatAuthors(authors) {
  if (!authors || authors.length === 0) return "Unknown Author";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
  return `${authors.slice(0, -1).join(", ")}, and ${
    authors[authors.length - 1]
  }`;
}

// Function to create markdown content
function createMarkdownContent(bookData) {
  const authors = formatAuthors(bookData.authors);
  const description = bookData.description || "No description available.";
  const thumbnail =
    bookData.imageLinks?.thumbnail || bookData.imageLinks?.smallThumbnail || "";

  return `---
title: "${bookData.title}"
author: "${authors}"
isbn: "${bookData.industryIdentifiers?.[0]?.identifier || bookData.isbn}"
publicationDate: "${bookData.publishedDate || "Unknown"}"
pageCount: ${bookData.pageCount || "Unknown"}
status: "want-to-read"
rating: null
startDate: null
completionDate: null
coverImage: "${thumbnail}"
tags: []
---

## About This Book

${description}

## My Take

I want to read this book.
`;
}

// Function to process a single book
async function processBook(bookIsbn) {
  try {
    console.log(`Fetching data for ISBN: ${bookIsbn}...`);

    const bookData = await new Promise((resolve, reject) => {
      isbn.resolve(bookIsbn, (err, book) => {
        if (err) {
          reject(err);
        } else {
          resolve(book);
        }
      });
    });

    const slug = createSlug(bookData.title);
    const filename = `${slug}.md`;
    const filePath = path.join("content", "books", filename);

    const markdownContent = createMarkdownContent(bookData);

    // Create the file
    fs.writeFileSync(filePath, markdownContent);

    console.log(`✓ Created: ${filename} - ${bookData.title}`);

    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error(`✗ Failed to process ISBN ${bookIsbn}:`, error.message);

    // Create a fallback file with minimal data
    const filename = `unknown-book-${bookIsbn}.md`;
    const filePath = path.join("content", "books", filename);
    const fallbackContent = `---
title: "Book ${bookIsbn}"
author: "Unknown Author"
isbn: "${bookIsbn}"
publicationDate: "Unknown"
pageCount: Unknown
status: "want-to-read"
rating: null
startDate: null
completionDate: null
coverImage: ""
tags: []
---

## About This Book

Book information could not be retrieved automatically.

## My Take

I want to read this book.

`;

    fs.writeFileSync(filePath, fallbackContent);
    console.log(`✓ Created fallback file: ${filename}`);
  }
}

// Main function
async function createAllBooks() {
  console.log("Starting bulk book creation...\n");

  // Ensure the books directory exists
  const booksDir = path.join("content", "books");
  if (!fs.existsSync(booksDir)) {
    fs.mkdirSync(booksDir, { recursive: true });
  }

  // Process each book
  for (const bookIsbn of books) {
    await processBook(bookIsbn);
  }

  console.log(`\n✓ Finished processing ${books.length} books!`);
  console.log("\nNext steps:");
  console.log("1. Review the generated files in content/books/");
  console.log("2. Update any placeholder content with your actual thoughts");
  console.log("3. Add ratings if you remember them");
  console.log("4. Commit the new files to your repository");
}

// Run the script
createAllBooks().catch(console.error);
