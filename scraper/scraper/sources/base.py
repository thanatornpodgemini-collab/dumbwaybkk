"""Base Source class - shared HTTP, rate limiting, robots check."""
from __future__ import annotations

import time
import urllib.robotparser
from dataclasses import dataclass, field
from typing import Iterable
from urllib.parse import urlparse

import requests
from tenacity import retry, stop_after_attempt, wait_exponential


USER_AGENT = (
    "dumbwaybkk-scraper/0.1 (+https://github.com/thanatornpodgemini-collab/dumbwaybkk)"
)


@dataclass
class Article:
    url: str
    title: str | None = None
    body: str | None = None
    published_at: str | None = None
    lang: str = "th"
    raw_html: str | None = None
    extras: dict = field(default_factory=dict)


class Source:
    name: str = "base"
    base_url: str = ""
    lang: str = "th"
    rate_per_sec: float = 0.5

    def __init__(self, rps: float | None = None):
        if rps:
            self.rate_per_sec = rps
        self._session = requests.Session()
        self._session.headers.update({"User-Agent": USER_AGENT})
        self._robots: urllib.robotparser.RobotFileParser | None = None
        self._last_fetch = 0.0

    def _ensure_robots(self) -> None:
        if self._robots is not None:
            return
        parsed = urlparse(self.base_url)
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(f"{parsed.scheme}://{parsed.netloc}/robots.txt")
        try:
            rp.read()
        except Exception:
            pass
        self._robots = rp

    def _allowed(self, url: str) -> bool:
        self._ensure_robots()
        try:
            return self._robots.can_fetch(USER_AGENT, url) if self._robots else True
        except Exception:
            return True

    def _throttle(self) -> None:
        gap = 1.0 / max(self.rate_per_sec, 0.05)
        wait = gap - (time.monotonic() - self._last_fetch)
        if wait > 0:
            time.sleep(wait)
        self._last_fetch = time.monotonic()

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, max=8))
    def fetch(self, url: str) -> str:
        if not self._allowed(url):
            raise RuntimeError(f"robots.txt disallows {url}")
        self._throttle()
        r = self._session.get(url, timeout=20)
        r.raise_for_status()
        return r.text

    # --- to be overridden ---

    def list_recent(self, days: int) -> Iterable[str]:
        """Yield article URLs from the last `days` days."""
        raise NotImplementedError

    def parse_article(self, url: str, html: str) -> Article:
        """Parse a single article page into an Article."""
        raise NotImplementedError
