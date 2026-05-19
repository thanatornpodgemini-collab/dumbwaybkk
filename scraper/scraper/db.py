"""SQLite schema + connection helpers."""
from __future__ import annotations

import sqlite3
from pathlib import Path
from contextlib import contextmanager

DB_PATH = Path(__file__).resolve().parent.parent / "data" / "incidents.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  fetched_at TEXT NOT NULL,
  published_at TEXT,
  title TEXT,
  body TEXT,
  lang TEXT
);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  article_id TEXT REFERENCES articles(id),
  category TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_th TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_th TEXT NOT NULL,
  date TEXT NOT NULL,
  location_en TEXT NOT NULL,
  location_th TEXT NOT NULL,
  lng REAL NOT NULL,
  lat REAL NOT NULL,
  radius_m INTEGER NOT NULL DEFAULT 80,
  severity TEXT NOT NULL,
  victims INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_incidents_category ON incidents(category);
CREATE INDEX IF NOT EXISTS idx_incidents_date ON incidents(date);
"""


def init_db(path: Path = DB_PATH) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(path) as conn:
        conn.executescript(SCHEMA)


@contextmanager
def connect(path: Path = DB_PATH):
    init_db(path)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()
