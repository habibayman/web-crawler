const { test, expect } = require('@jest/globals');
const { sortPages } = require('../src/report');

test('sort pages by number of links', () => {
  const pages = {
    'https://blog.boot.dev/contact': 1,
    'https://blog.boot.dev/about': 2,
    'https://blog.boot.dev/path': 3,
  };
  const actual = sortPages(pages);
  const expected = [
    ['https://blog.boot.dev/path', 3],
    ['https://blog.boot.dev/about', 2],
    ['https://blog.boot.dev/contact', 1],
  ];
  expect(actual).toEqual(expected);
});
