## Normalizing URLs

The domain and the path effectively make up the page.\
query parameteres, protocol ...etc don't matter when it comes to what page this url represents.

why not inly use a regex? because there's no way to remove parts like ports or query parameters

## Extracting URLs from HTML

Instead of a Regex, we can use the jsdom library to parse the HTML and extract URLs.
like this:

```js
const dom = new JSDOM(htmlBody);
const links = dom.window.document.querySelectorAll('a');
```

and then looping over the links array performing the same logic

---

## Misc.

```js
if (process.argv.length < 3)
```

why 3?

1. The first argument to any program is always the name of the program,
   here node is technically the name of our program because node is what's running and iterpreting our code (we're using an interpreted language)
2. The second argument is the entry point file
3. What we're looking for :)
