"""Thairath source - uses public news listing pages."""
from __future__ import annotations

from typing import Iterable
from urllib.parse import urljoin

import feedparser
from bs4 import BeautifulSoup

from .base import Article, Source


class Thairath(Source):
    name = "thairath"
    base_url = "https://www.thairath.co.th"
    lang = "th"
    # Thairath publishes RSS for sections; "news" covers local/crime/accidents.
    rss_feeds = [
        "https://www.thairath.co.th/rss/news",
        "https://www.thairath.co.th/rss/local",
    ]

    def list_recent(self, days: int) -> Iterable[str]:
        for feed_url in self.rss_feeds:
            try:
                feed = feedparser.parse(feed_url)
            except Exception:
                continue
            for entry in feed.entries:
                yield entry.link

    def parse_article(self, url: str, html: str) -> Article:
        soup = BeautifulSoup(html, "lxml")
        title = (soup.find("h1") or soup.find("title"))
        title_text = title.get_text(strip=True) if title else None
        body_el = soup.select_one("article") or soup.select_one(".content-body") or soup.body
        body = body_el.get_text(" ", strip=True) if body_el else None
        time_el = soup.find("time")
        published = time_el.get("datetime") if time_el else None
        return Article(
            url=url,
            title=title_text,
            body=body,
            published_at=published,
            lang="th",
            raw_html=html,
        )
