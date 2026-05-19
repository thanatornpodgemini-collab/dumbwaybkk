# Dumb Ways to Die in Bangkok

An interactive field guide to incidents reported in Thai news over the last
ten years, plotted onto a map of Bangkok with a hand-drawn cartoon
character per category.

Design tone is inspired by Metro Trains Melbourne's
"Dumb Ways to Die" campaign — flat, bright, bean-shaped characters with
X-eyes, deadpan one-liners — applied to documented patterns of urban risk
specific to Bangkok.

## Stack

- **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**
- **Mapbox GL** via `react-map-gl` for the map and incident radii
- **Zustand** for tiny client state (active category, language, selected pin)
- **Framer Motion** ready for richer animations
- **Storybook 8** as the design review dashboard
- **Python scraper** (`scraper/`) — Thairath, Khaosod, Bangkok Post via RSS;
  SQLite + JSON export
- **Bilingual** — every string carries `en` + `th`; live toggle in the header

## Quick start

```bash
# 1. install web app deps
npm install

# 2. add a Mapbox token (free at mapbox.com)
cp .env.local.example .env.local
$EDITOR .env.local   # paste NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx

# 3. run the app
npm run dev          # http://localhost:3000

# 4. run the design dashboard
npm run storybook    # http://localhost:6006
```

The map ships pre-populated with a curated seed dataset of ~40 documented
Bangkok incident patterns (see `data/incidents.json`). A yellow banner
will appear in the UI until you run the scraper and replace the file.

If you start the app without a Mapbox token, the map area falls back to a
grid view of all characters + incidents so you can still review the design.

## Running the scraper

```bash
cd scraper
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

python -m scraper.main --days 30                   # fetch + classify + store
python -m scraper.main --export ../data/incidents.json  # replace web data
```

See `scraper/README.md` for details on sources, NLP, geocoding, and how to
add new outlets.

## Project layout

```
app/                   Next.js App Router pages
components/            React components
  characters/          One SVG bean-character per incident category
  *.stories.tsx        Storybook stories
lib/
  categories.ts        12 category metadata (label, color, tagline)
  i18n.ts              All UI copy (en + th)
  incidents.ts         Loads & filters data/incidents.json
  store.ts             Zustand client store
  types.ts             Shared TypeScript types
data/
  incidents.json       Live data the app reads (seed by default)
scraper/               Python scraping pipeline (own README)
stories/               Design-system stories (palette, typography)
.storybook/            Storybook config
```

## Categories shipped in v1

BTS/MRT · Motorbike taxi · Klong boat · Electrocution · Soi dog · Falling
billboard · Construction · Songkran · PM2.5 · Tuk-tuk · Street food · Flood.

Adding a new category:
1. Add to `CategoryId` in `lib/types.ts` and `CATEGORIES` in `lib/categories.ts`
2. Create `components/characters/MyNewCharacter.tsx` (use `CharacterFrame` + `BeanBody`)
3. Register it in `components/characters/index.ts`
4. Add keyword rules to `scraper/scraper/nlp/classifier.py`

## Editorial note

This is a project about traffic, infrastructure, and public-safety
*patterns*, framed playfully — not about mocking individuals. The seed
dataset describes documented incident *types* at district granularity; no
victim names or personal details are included. The scraper preserves
links back to original news sources for attribution.
