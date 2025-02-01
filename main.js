const { crawl } = require('./src/crawl');

async function main() {
  if (process.argv.length !== 3) {
    console.error('Usage: node main.js <input>');
    process.exit(1);
  }
  console.log(`Crawling: ${process.argv[2]}`);

  const baseUrl = process.argv[2];
  const pages = await crawl(baseUrl, baseUrl, {});

  // print each page from the pages object
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
