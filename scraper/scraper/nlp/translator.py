"""Translation stub.

In production, swap `translate` to call your preferred translation service
(Claude / Google / DeepL). For v1 we keep summaries in the source language
and copy them across both fields so the UI always has *something* to render.
"""
from __future__ import annotations


def translate(text: str, source: str, target: str) -> str:
    if not text:
        return ""
    if source == target:
        return text
    # Placeholder: pass-through with a "[lang]" prefix so it's obvious in QA
    # that machine translation hasn't been wired up yet.
    return f"[{target}] {text}"
