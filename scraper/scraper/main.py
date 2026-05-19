"""Scraper CLI - run the full pipeline end to end.

Usage:
  python -m scraper.main --days 30
  python -m scraper.main --sources thairath khaosod
  python -m scraper.main --export ../data/incidents.json
"""
from __future__ import annotations

import argparse
import hashlib
import sys
from datetime import datetime, timezone
from pathlib import Path

from .db import connect, init_db
from .export import export_to_json
from .nlp.classifier import classify
from .nlp.locator import lookup_location
from .nlp.translator import translate
from .sources import ALL_SOURCES


def _hash_id(*parts: str) -> str:
    return hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()[:16]


def _looks_bangkok(text: str) -> bool:
    """Quick filter: must mention Bangkok or a known district."""
    if not text:
        return False
    needles = ("กรุงเทพ", "กทม", "Bangkok", "BKK")
    if any(n.lower() in text.lower() for n in needles):
        return True
    return lookup_location(text) is not None


def run(days: int, sources_filter: list[str] | None, rps: float) -> int:
    init_db()
    total = 0
    with connect() as conn:
        for SrcCls in ALL_SOURCES:
            src = SrcCls(rps=rps)
            if sources_filter and src.name not in sources_filter:
                continue
            print(f"[{src.name}] listing recent articles...")
            urls = list(src.list_recent(days=days))
            print(f"[{src.name}] {len(urls)} candidates")
            for url in urls:
                try:
                    html = src.fetch(url)
                    art = src.parse_article(url, html)
                except Exception as e:
                    print(f"[{src.name}] skip {url}: {e}")
                    continue

                text = " ".join(filter(None, [art.title, art.body]))
                if not _looks_bangkok(text):
                    continue
                cls = classify(text)
                if not cls.category:
                    continue
                loc = lookup_location(text)
                if not loc:
                    continue

                title_src = art.title or ""
                summary_src = (art.body or "")[:400]
                title_en = title_src if art.lang == "en" else translate(title_src, "th", "en")
                title_th = title_src if art.lang == "th" else translate(title_src, "en", "th")
                summary_en = summary_src if art.lang == "en" else translate(summary_src, "th", "en")
                summary_th = summary_src if art.lang == "th" else translate(summary_src, "en", "th")

                published = art.published_at or datetime.now(timezone.utc).strftime("%Y-%m-%d")
                date = published[:10]

                inc_id = _hash_id(src.name, url)
                conn.execute(
                    """INSERT OR REPLACE INTO incidents
                       (id, article_id, category, title_en, title_th,
                        summary_en, summary_th, date,
                        location_en, location_th, lng, lat,
                        radius_m, severity, victims)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        inc_id, None, cls.category, title_en, title_th,
                        summary_en, summary_th, date,
                        loc.label_en, loc.label_th, loc.lng, loc.lat,
                        80, "injury", None,
                    ),
                )
                total += 1
        conn.commit()
    print(f"Imported {total} incidents.")
    return total


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--days", type=int, default=30)
    p.add_argument("--sources", nargs="*", default=None,
                   help="Restrict to: thairath khaosod bangkokpost")
    p.add_argument("--rps", type=float, default=0.5)
    p.add_argument("--export", type=str, default=None,
                   help="Path to write JSON snapshot (e.g. ../data/incidents.json)")
    p.add_argument("--bootstrap", action="store_true",
                   help="Only initialise the DB, don't scrape.")
    args = p.parse_args(argv)

    if args.bootstrap:
        init_db()
        print("DB initialised.")
        return 0

    if not args.export:
        run(args.days, args.sources, args.rps)
    else:
        out = Path(args.export)
        n = export_to_json(out)
        print(f"Wrote {n} incidents to {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
