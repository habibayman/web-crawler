const { crawl } = require('./src/crawl');
const { printReport } = require('./src/report');

async function main() {
  if (process.argv.length !== 3) {
    console.error('Usage: node main.js <input>');
    process.exit(1);
  }
  console.log(`Crawling: ${process.argv[2]}`);

  const baseUrl = process.argv[2];
  const pages = await crawl(baseUrl, baseUrl, {});

  printReport(pages);
}

main();
