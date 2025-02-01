const { URL } = require('url');
// normalizing the url because sometimes two urls can lead to the same page http / https, boot.dev / Boot.dev
const normalizeURL = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.hostname}${urlObj.pathname}`.replace(/\/$/, ''); // remove trailing slash
  } catch (error) {
    return url.replace(/^[a-zA-Z]+:\/\//, '');
  }
};

module.exports = { normalizeURL };
