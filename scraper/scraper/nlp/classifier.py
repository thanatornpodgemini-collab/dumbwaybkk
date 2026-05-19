"""Rule-based incident category classifier (Thai + English keywords)."""
from __future__ import annotations

from dataclasses import dataclass

# Category IDs match lib/types.ts:CategoryId. Keywords intentionally
# bilingual; first match wins, ordered by specificity.
CATEGORY_KEYWORDS: list[tuple[str, list[str]]] = [
    ("rail",          ["BTS", "MRT", "รถไฟฟ้า", "บีทีเอส", "ชานชาลา", "platform"]),
    ("klong_boat",    ["เรือคลอง", "เรือด่วน", "คลองแสนแสบ", "klong", "ferry"]),
    ("songkran",      ["สงกรานต์", "Songkran", "เล่นน้ำ"]),
    ("electrocution", ["ไฟดูด", "ไฟช็อต", "electrocut", "ไฟฟ้าช็อต"]),
    ("flood",         ["น้ำท่วม", "flood", "ฝนตกหนัก"]),
    ("billboard",     ["ป้ายโฆษณา", "billboard", "ป้ายล้ม"]),
    ("construction",  ["ก่อสร้าง", "construction", "นั่งร้าน", "เครน", "crane"]),
    ("pollution",     ["PM2.5", "ฝุ่น", "smog", "pollution", "ค่าฝุ่น"]),
    ("street_food",   ["รถเข็น", "อาหารริมทาง", "ถังแก๊ส", "gas cylinder", "street food"]),
    ("soi_dog",       ["หมา", "สุนัข", "dog bite", "stray dog", "หมาจร", "หมากัด"]),
    ("tuktuk",        ["ตุ๊กตุ๊ก", "ตุ๊ก ๆ", "tuk-tuk", "tuktuk", "สามล้อ"]),
    ("motorbike",     ["มอเตอร์ไซค์", "จักรยานยนต์", "วินมอเตอร์ไซค์", "motorbike", "motorcycle", "moto"]),
]


@dataclass
class Classification:
    category: str | None
    confidence: float
    matched: list[str]


def classify(text: str) -> Classification:
    if not text:
        return Classification(None, 0.0, [])
    lower = text.lower()
    for category, kws in CATEGORY_KEYWORDS:
        for kw in kws:
            if kw.lower() in lower:
                return Classification(category, 0.8, [kw])
    return Classification(None, 0.0, [])
