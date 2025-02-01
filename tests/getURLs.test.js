const { test, expect } = require('@jest/globals'); // eslint-disable-line import/no-extraneous-dependencies
const { getURLsFromHTML } = require('../src/crawl');

test('get absolute URLs from HTML', () => {
  const htmlBody = `
			<html>
				<body>
					<a href="https://blog.boot.dev/path">Blog</a>
				</body>
			</html>`;
  const baseUrl = 'https://blog.boot.dev/path';
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  const expected = ['https://blog.boot.dev/path'];
  expect(actual).toEqual(expected);
});

test('get relative URLs from HTML', () => {
  const htmlBody = `
			<html>
				<body>
					<a href="https://blog.boot.dev/path">Blog</a>
					<a href="/about">About</a>
				</body>
			</html>`;
  const baseUrl = 'https://blog.boot.dev/path';
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  const expected = ['https://blog.boot.dev/path', 'https://blog.boot.dev/path/about'];
  expect(actual).toEqual(expected);
});

test('ignore invalid URLs in HTML', () => {
  const htmlBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path">Valid</a>
        <a href="#">Invalid</a>
        <a href="javascript:void(0)">Invalid</a>
        <a href="">Invalid</a>
      </body>
    </html>`;
  const baseUrl = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  const expected = ['https://blog.boot.dev/path'];
  expect(actual).toEqual(expected);
});

test('handle URLs with fragments', () => {
  const htmlBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path#section">Fragment</a>
        <a href="/about#team">About</a>
      </body>
    </html>`;
  const baseUrl = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  const expected = ['https://blog.boot.dev/path#section', 'https://blog.boot.dev/about#team'];
  expect(actual).toEqual(expected);
});

test('ignore non-anchor tags', () => {
  const htmlBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path">Valid</a>
        <img src="https://blog.boot.dev/image.png">
        <script src="https://blog.boot.dev/script.js"></script>
      </body>
    </html>`;
  const baseUrl = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(htmlBody, baseUrl);
  const expected = ['https://blog.boot.dev/path'];
  expect(actual).toEqual(expected);
});
