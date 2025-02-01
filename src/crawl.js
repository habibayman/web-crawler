/* eslint-disable no-cond-assign */
/* eslint-disable no-script-url */
/* eslint-disable no-continue */

const { URL } = require('url');

// helper
const isAbsoluteUrl = (url) => {
  const protocolRegex = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
  return protocolRegex.test(url);
};

const isValidPage = async (resp, url) => {
  if (resp.status > 399) {
    console.error(`Error ${resp.status} in fetch on page: ${url}`);
    return false;
  }

  const contentType = resp.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    console.error(`Skipping non-HTML page: ${url}`);
    return false;
  }

  return true;
};

const doesHaveSameDomain = (url1, url2) => {
  const urlObj1 = new URL(url1);
  const urlObj2 = new URL(url2);
  return urlObj1.hostname === urlObj2.hostname;
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
      urls.push(url);
    } catch (error) {
      console.log(`Invalid URL: ${url}`);
    }
  }
  return urls;
};

const crawl = async (baseURL, currentURL, pages) => {
  try {
    if (!doesHaveSameDomain(baseURL, currentURL)) return pages;

    const normalizedCurrURL = normalizeURL(currentURL);
    if (pages[normalizedCurrURL] > 0) {
      pages[normalizedCurrURL]++;
      return pages;
    }

    pages[normalizedCurrURL] = 1;
    console.log(`Visiting: ${currentURL}`);
    const resp = await fetch(currentURL);
    if (!isValidPage(resp, currentURL)) return pages;

    const htmlBody = await resp.text();
    const urls = getURLsFromHTML(htmlBody, baseURL);

    for (const url of urls) pages = await crawl(baseURL, url, pages);

    return pages;
  } catch (error) {
    console.error(`Error in fetching: ${error.message}\nOn page: ${currentURL}`);
    return pages;
  }
};

module.exports = { normalizeURL, getURLsFromHTML, crawl };
