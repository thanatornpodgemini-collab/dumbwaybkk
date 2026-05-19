# Bangkok Incident Scraper

Python pipeline that ingests Thai news (Thairath, Khaosod, Bangkok Post), filters Bangkok incidents, classifies them into one of the 12 categories, geocodes the location, and exports to the JSON format the Next.js app consumes.

## Quick start

```bash
cd scraper
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# (optional) seed bilingual dictionaries & geocoder caches the first time
python -m scraper.main --bootstrap

# scrape last N days from all sources
python -m scraper.main --days 30

# export DB → app's data/incidents.json (overwrites seed file)
python -m scraper.main --export ../data/incidents.json
```

## Architecture

```
scraper/
  scraper/
    main.py          - CLI entrypoint (--days, --sources, --export, --bootstrap)
    db.py            - SQLite schema + connection
    export.py        - DB → JSON serializer (matches lib/types.ts:Incident)
    sources/
      base.py        - Abstract Source class (fetch_index, fetch_article)
      thairath.py    - thairath.co.th
      khaosod.py     - khaosod.co.th
      bangkokpost.py - bangkokpost.com (English-language fallback)
    nlp/
      classifier.py  - rule + keyword based category mapping (Thai + English)
      locator.py     - extract Bangkok district/soi/landmark → lat,lng
      translator.py  - Thai ↔ English summaries (LLM-optional)
```

## Database

SQLite file at `scraper/data/incidents.db`. Schema in `db.py`. The exporter
writes a JSON snapshot matching the TypeScript `Incident` type so the web app
can consume it directly without a runtime DB.

## Notes on legal & polite scraping

- Respect `robots.txt`. The fetcher hard-aborts on disallow.
- 1 req / 2s default rate limit per source. Configurable via `--rps`.
- Use the public archive listing pages, not search-engine indexed ones.
- Many Thai sites publish RSS — prefer those where available
  (Thairath has `/rss/news` feeds for sections).
- Cache full article HTML in `data/raw/` so re-runs don't re-fetch.

## Why these three sources

- **Thairath** — largest Thai daily, broad incident coverage, simple HTML.
- **Khaosod** — strong on local Bangkok beat reporting.
- **Bangkok Post** — English-language, good for cross-validating
  category + location and for skipping translation when generating
  English summaries.

## Extending

Add a new source by subclassing `scraper.sources.base.Source` and registering
it in `scraper/sources/__init__.py`.
