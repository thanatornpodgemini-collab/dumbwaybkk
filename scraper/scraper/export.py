"""Export the SQLite incidents table to the JSON shape the web app reads."""
from __future__ import annotations

import json
from pathlib import Path

from .db import connect


def export_to_json(out_path: Path) -> int:
    with connect() as conn:
        rows = conn.execute(
            "SELECT * FROM incidents ORDER BY date DESC"
        ).fetchall()

    incidents = []
    for r in rows:
        incidents.append({
            "id": r["id"],
            "category": r["category"],
            "title": {"en": r["title_en"], "th": r["title_th"]},
            "summary": {"en": r["summary_en"], "th": r["summary_th"]},
            "date": r["date"],
            "location": {"en": r["location_en"], "th": r["location_th"]},
            "coordinates": [r["lng"], r["lat"]],
            "radiusM": r["radius_m"],
            "severity": r["severity"],
            "victims": r["victims"],
            "sources": [],  # populated from the join below if needed
            "seed": False,
        })

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(incidents, ensure_ascii=False, indent=2))
    return len(incidents)
