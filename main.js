const { crawl } = require('./src/crawl');

function main() {
  if (process.argv.length !== 3) {
    console.error('Usage: node main.js <input>');
    process.exit(1);
  }
  console.log(`Crawling: ${process.argv[2]}`);

  const baseUrl = process.argv[2];
  const pages = crawl(baseUrl, baseUrl, new Set());
}

main();
