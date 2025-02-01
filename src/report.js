const fs = require('fs');

const sortPages = (pages) => {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]);

  return pagesArray;
};

const printReport = async (pages) => {
  // write results to a file named report.txt
  const sortedPages = sortPages(pages);
  const report = sortedPages.map((page) => `${page[0]} - ${page[1]}`).join('\n');
  fs.writeFile(`report.txt`, report, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Report saved to report.txt');
  });
};

module.exports = {
  sortPages,
  printReport,
};
