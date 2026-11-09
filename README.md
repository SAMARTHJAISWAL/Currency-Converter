# Currency Converter

A small browser app that converts an amount between ~155 world currencies using live exchange rates. Built with plain HTML, CSS and JavaScript — no build step, no API key.

## Features

- Pick a "from" and "to" currency (defaults: USD → INR); the country flag updates with the selection.
- Enter any positive amount and click **Get Exchange Rate** to see the converted value.
- Swap button to flip the two currencies.
- Fetches the latest rates on page load, shows a clear message if rates can't be loaded or a pair isn't supported.

## Tech stack

- HTML, CSS, vanilla JavaScript
- [Font Awesome 6](https://fontawesome.com/) (CDN) for the swap icon

## APIs used (both free, no key required)

- **Exchange rates:** [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api)
  - Primary: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{code}.json`
  - Fallback: `https://latest.currency-api.pages.dev/v1/currencies/{code}.json`
  - Rates are updated daily.
- **Flags:** [flagsapi.com](https://flagsapi.com/) — `https://flagsapi.com/{COUNTRY}/flat/64.png`

## Run locally

It's a static site, so any static file server works. With Python 3:

```bash
git clone https://github.com/SAMARTHJAISWAL/Currency-Converter.git
cd Currency-Converter
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly from disk also works in most browsers.)

## Project structure

```
index.html   page markup
style.css    styles
codes.js     currency code → country code map (used for the dropdowns and flags)
app.js       dropdown setup, flag updates, rate fetching and conversion
```

## Deployment

Because it is a plain static site, it can be hosted as-is on GitHub Pages (or any static host).

## Licence

[MIT](LICENSE) © 2024–2026 Samarth Jaiswal
