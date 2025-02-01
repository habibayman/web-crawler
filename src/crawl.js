/* eslint-disable no-cond-assign */
/* eslint-disable no-script-url */
/* eslint-disable no-continue */

const { URL } = require('url');

// helper
const isAbsoluteUrl = (url) => {
  const protocolRegex = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
  return protocolRegex.test(url);
};

const isValidHtml = async (url) => {
  const resp = await fetch(url);
  // console.log(await resp.text());

  if (resp.status > 399) {
    console.error(`Error ${resp.status} in fetch on page: ${url}`);
    return false;
  }

  const contentType = resp.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    console.error(`Skipping non-HTML page: ${url}`);
    return false;
  }

  return resp;
};

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
  const hrefRegex = /href="([^"]+)"/g;
  let match;

  while ((match = hrefRegex.exec(htmlBody))) {
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

const crawl = async (baseURL, currentURL, pages) => {
  if (!currentURL.includes(baseURL)) return; // check if both URLs belong to the same domain

  //check if the page has already been visited
  const normalizedURL = normalizeURL(currentURL);
  if (pages.has(normalizedURL)) return pages[normalizedURL]++;

  pages[normalizedURL] = 1; // visit the page
  console.log(`Visiting: ${currentURL}`);

  try {
    const html = await isValidHtml(currentURL);
    const htmlBody = await html.text();
    const urls = getURLsFromHTML(htmlBody, baseURL);

    for (const url of urls) pages = await crawl(baseURL, url, pages);
  } catch (error) {
    console.error(`Error in fetching: ${error.message}\nOn page: ${currentURL}`);
  }

  return pages;
};

module.exports = { normalizeURL, getURLsFromHTML, crawl };
