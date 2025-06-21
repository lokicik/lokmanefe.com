const isbn = require("node-isbn");
const fs = require("fs");
const path = require("path");

// List of ISBNs with completion years
const books = [
  { isbn: "9780345457684", year: 2020 },
  { isbn: "9780312340599", year: 2019 },
  { isbn: "9780544003415", year: 2018 },
  { isbn: "9780316015844", year: 2019 },
  { isbn: "9780553381689", year: 2021 },
  { isbn: "9780451524935", year: 2020 },
  { isbn: "9780547928227", year: 2022 },
  { isbn: "9780062315007", year: 2023 },
  { isbn: "9780385490818", year: 2024 },
  { isbn: "9780131755635", year: 2025 },
  { isbn: "9780062457714", year: 2023 },
  { isbn: "9780307887436", year: 2022 },
  { isbn: "9780345391803", year: 2021 },
  { isbn: "9780156012195", year: 2020 },
  { isbn: "9780525559474", year: 2024 },
  { isbn: "9780062316097", year: 2023 },
  { isbn: "9780062073495", year: 2022 },
  { isbn: "9780062332608", year: 2021 },
  { isbn: "9780062332639", year: 2021 },
  { isbn: "9780062332653", year: 2021 },
  { isbn: "9780553381689", year: 2018 },
  { isbn: "9780553381696", year: 2018 },
  { isbn: "9780553381702", year: 2018 },
  { isbn: "9780007447862", year: 2018 },
  { isbn: "9780553801477", year: 2018 },
  { isbn: "9783961897391", year: 2022 },
  { isbn: "9798745274824", year: 2023 },
  { isbn: "9781922247520", year: 2020 },
  { isbn: "9782070650149", year: 2020 },
  { isbn: "9782070665631", year: 2020 },
  { isbn: "9781338878929", year: 2021 },
  { isbn: "9781338878936", year: 2021 },
  { isbn: "9781338878943", year: 2021 },
  { isbn: "9781338878950", year: 2021 },
  { isbn: "9781338878967", year: 2021 },
  { isbn: "9781338878974", year: 2021 },
  { isbn: "9781338878981", year: 2021 },
  { isbn: "9781338216660", year: 2021 },
  { isbn: "9786050825596", year: 2020 },
  { isbn: "9786050827941", year: 2020 },
  { isbn: "9781853260407", year: 2018 },
  { isbn: "9780441172719", year: 2023 },
  { isbn: "9780593098233", year: 2023 },
  { isbn: "9780593098240", year: 2024 },
  { isbn: "9780593098257", year: 2024 },
  { isbn: "9780593098264", year: 2024 },
  { isbn: "9780593098271", year: 2024 },
  { isbn: "9780805094596", year: 2017 },
  { isbn: "9781250044433", year: 2017 },
  { isbn: "9781250063168", year: 2017 },
  { isbn: "9781627795098", year: 2018 },
  { isbn: "9781423159322", year: 2018 },
  { isbn: "9781423157519", year: 2018 },
  { isbn: "9781423159346", year: 2018 },
  { isbn: "9781368022484", year: 2019 },
  { isbn: "9780733634475", year: 2018 },
  { isbn: "9780802723314", year: 2018 },
  { isbn: "9786050819267", year: 2019 },
  { isbn: "9786258431834", year: 2019 },
  { isbn: "9780143039433", year: 2022 },
  { isbn: "9789756841174", year: 2020 },
  { isbn: "9780316769174", year: 2021 },
  { isbn: "9780307277671", year: 2022 },
  { isbn: "9789759038458", year: 2016 },
  { isbn: "9789752201279", year: 2018 },
  { isbn: "9781400034710", year: 2021 },
  { isbn: "9780060883287", year: 2022 },
  { isbn: "9788175992955", year: 2020 },
  { isbn: "9798366405683", year: 2020 },
  { isbn: "9780241678893", year: 2023 },
  { isbn: "9780648337928", year: 2023 },
  { isbn: "9781533650320", year: 2023 },
  { isbn: "9780393312836", year: 2021 },
  { isbn: "9780393317558", year: 2022 },
  { isbn: "9789754704723", year: 2021 },
  { isbn: "9782253157632", year: 2019 },
  { isbn: "9780142415917", year: 2019 },
  { isbn: "9780803734739", year: 2019 },
  { isbn: "9780140441185", year: 2020 },
  { isbn: "9781503250888", year: 2021 },
  { isbn: "9798308648314", year: 2020 },
  { isbn: "9780452284234", year: 2020 },
  { isbn: "9781774267547", year: 2023 },
  { isbn: "9781891396885", year: 2023 },
  { isbn: "9781843918578", year: 2023 },
  { isbn: "9781979644198", year: 2020 },
  { isbn: "9781777005474", year: 2024 },
  { isbn: "9780307951526", year: 2023 },
  { isbn: "9780735211292", year: 2024 },
  { isbn: "9781782692454", year: 2022 },
  { isbn: "9780399501487", year: 2019 },
  { isbn: "9781522054078", year: 2020 },
  { isbn: "9781494812454", year: 2020 },
  { isbn: "9781853261756", year: 2019 },
  { isbn: "9780486832944", year: 2021 },
  { isbn: "9780141439600", year: 2020 },
  { isbn: "9786053607021", year: 2020 },
  { isbn: "9780060850524", year: 2019 },
  { isbn: "9780593160022", year: 2021 },
  { isbn: "9780345453747", year: 2016 },
  { isbn: "9780143303831", year: 2014 },
  { isbn: "9781419741869", year: 2014 },
  { isbn: "9781419741876", year: 2015 },
  { isbn: "9781419741883", year: 2015 },
  { isbn: "9781419741890", year: 2015 },
  { isbn: "9781419741913", year: 2015 },
  { isbn: "9781419741937", year: 2015 },
  { isbn: "9780679720201", year: 2022 },
  { isbn: "9780099590088", year: 2019 },
  { isbn: "9780547928227", year: 2018 },
  { isbn: "9780547928210", year: 2019 },
  { isbn: "9780358380245", year: 2019 },
  { isbn: "9780358380252", year: 2019 },
  { isbn: "9780063280779", year: 2020 },
  { isbn: "9780142406632", year: 2014 },
  { isbn: "9780142408421", year: 2015 },
  { isbn: "9780142410752", year: 2016 },
  { isbn: "9781864719079", year: 2016 },
  { isbn: "9780142414293", year: 2016 },
  { isbn: "9780142415245", year: 2016 },
  { isbn: "9780440869733", year: 2016 },
  { isbn: "9780142418574", year: 2016 },
  { isbn: "9780142418581", year: 2016 },
  { isbn: "9780142418598", year: 2016 },
  { isbn: "9780142421956", year: 2016 },
  { isbn: "9780142427316", year: 2016 },
  { isbn: "9780399256196", year: 2017 },
  { isbn: "9780142426630", year: 2017 },
  { isbn: "9780142426647", year: 2017 },
  { isbn: "9780142427262", year: 2017 },
  { isbn: "9780142427279", year: 2017 },
  { isbn: "9789754767490", year: 2012 },
  { isbn: "9786054962891", year: 2015 },
  { isbn: "9786051069302", year: 2013 },
  { isbn: "9789752107830", year: 2017 },
  { isbn: "9780060845506", year: 2021 },
  { isbn: "9780553380163", year: 2017 },
  { isbn: "9780241422267", year: 2019 },
  { isbn: "9798412190860", year: 2021 },
  { isbn: "9798311035279", year: 2022 },
  { isbn: "9789754370799", year: 2020 },
  { isbn: "9780525559498", year: 2024 },
  { isbn: "9780811204811", year: 2024 },
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
function createMarkdownContent(bookData, year) {
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
status: "completed"
rating: null
startDate: null
completionDate: "${year}"
coverImage: "${thumbnail}"
tags: []
---

## About This Book

${description}

## My Take

I completed this book in ${year}. Looking back, I don't have detailed notes from this read, but it was part of my reading journey during that time.

*This is a placeholder - I may update this with more detailed thoughts if I revisit the book or have stronger memories of it.*
`;
}

// Function to process a single book
async function processBook(bookInfo) {
  try {
    console.log(`Fetching data for ISBN: ${bookInfo.isbn}...`);

    const bookData = await new Promise((resolve, reject) => {
      isbn.resolve(bookInfo.isbn, (err, book) => {
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

    const markdownContent = createMarkdownContent(bookData, bookInfo.year);

    // Create the file
    fs.writeFileSync(filePath, markdownContent);

    console.log(`✓ Created: ${filename} - ${bookData.title}`);

    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error(`✗ Failed to process ISBN ${bookInfo.isbn}:`, error.message);

    // Create a fallback file with minimal data
    const filename = `unknown-book-${bookInfo.isbn}.md`;
    const filePath = path.join("content", "books", filename);
    const fallbackContent = `---
title: "Book ${bookInfo.isbn}"
author: "Unknown Author"
isbn: "${bookInfo.isbn}"
publicationDate: "Unknown"
pageCount: Unknown
status: "completed"
rating: null
startDate: null
completionDate: "${bookInfo.year}"
coverImage: ""
tags: []
---

## About This Book

Book information could not be retrieved automatically.

## My Take

I completed this book in ${bookInfo.year}. Unfortunately, I don't have detailed information or notes from this read.

*This entry needs manual updating with proper book details.*
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
  for (const bookInfo of books) {
    await processBook(bookInfo);
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
