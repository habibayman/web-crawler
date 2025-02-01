<div align='center'>
<h1> Simple Web Crawler </h1>

</div>

## $\color{rgba(242, 53, 85)}{\textsf{What it can do:}}$

- **Crawl Websites**: Recursively crawl a website starting from a given URL.
- **Extract Links**: Extract all internal links from HTML pages.
- **Generate Reports**: Generate a sorted report of pages based on the number of inbound links.

## $\color{rgba(242, 53, 85)}{\textsf{API}}$

`crawl(baseURL, currentURL, pages)`

Crawls a website starting from `currentURL` and returns a report of all internal pages.

- `baseURL`: The base URL of the website (e.g., `https://blog.boot.dev`).
- `currentURL`: The current URL to crawl (e.g., `https://blog.boot.dev/about`).
- `pages`: An object to track visited pages and their inbound links.

> [!NOTE]
> default is set to start from the baseURL if no start point is sepcified

## $\color{rgba(242, 53, 85)}{\textsf{How to Use}}$

1. clone the repo and install the dependencies

```bash
git clone https://github.com/habibayman/web-crawler
npm i
```

2. run using a sample URL

```
node app.js https://www.wagslane.dev
```

#### If you've encountered a problem and wanted to run the individual function's tests, run:

```bash
npm test
```
