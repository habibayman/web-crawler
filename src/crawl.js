/* eslint-disable no-cond-assign */
/* eslint-disable no-script-url */
/* eslint-disable no-continue */

const { URL } = require('url');
const { JSDOM } = require('jsdom'); // eslint-disable-line import/no-extraneous-dependencies

// helper
const isAbsoluteUrl = (url) => /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);

const normalizeURL = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.hostname}${urlObj.pathname}${urlObj.hash}`.replace(/\/$/, ''); // remove trailing slash
  } catch (error) {
    console.log(`Invalid URL: ${url}`);
  }
};

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const urls = [];
  const re = /href="([^"]+)"/g;
  let match;

  while ((match = re.exec(htmlBody)) !== null) {
    let url = match[1];

    // skip invalid URLs
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('javascript:'))
      continue;

    if (!isAbsoluteUrl(url)) url = `${baseUrl}${url}`;

    try {
      const normalizedURL = normalizeURL(url);
      urls.push(normalizedURL);
    } catch (error) {
      throw new Error(`Invalid URL: ${url}`);
    }
  }
  return urls;
};
// const getURLsFromHTML = (html) => {
//   const urls = [];
//   const re = /href="([^"]+)"/g;
//   let match;
//   while ((match = re.exec(html)) !== null) {
//     urls.push(match[1]);
//   }
//   return urls;
// };

module.exports = { normalizeURL, getURLsFromHTML };
