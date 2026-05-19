"""Extract Bangkok location → (lng, lat).

Strategy: match against a baked-in gazetteer of Bangkok districts (เขต),
landmarks, and arterial roads. Returns the centroid of the matched feature.
Good enough for v1; can be upgraded to a live geocoder (Nominatim, Google)
later by swapping `lookup_location`.
"""
from __future__ import annotations

from dataclasses import dataclass

# (en_label, th_label, lng, lat)
DISTRICTS: list[tuple[str, str, float, float]] = [
    ("Phra Nakhon",     "พระนคร",       100.4969, 13.7589),
    ("Pom Prap",        "ป้อมปราบ",     100.5106, 13.7530),
    ("Samphanthawong",  "สัมพันธวงศ์",   100.5108, 13.7393),
    ("Bang Rak",        "บางรัก",       100.5219, 13.7283),
    ("Pathum Wan",      "ปทุมวัน",      100.5364, 13.7426),
    ("Ratchathewi",     "ราชเทวี",      100.5347, 13.7572),
    ("Phaya Thai",      "พญาไท",        100.5444, 13.7794),
    ("Din Daeng",       "ดินแดง",       100.5667, 13.7693),
    ("Huai Khwang",     "ห้วยขวาง",     100.5727, 13.7766),
    ("Watthana",        "วัฒนา",        100.5705, 13.7395),
    ("Khlong Toei",     "คลองเตย",     100.5566, 13.7194),
    ("Sathorn",         "สาทร",        100.5285, 13.7220),
    ("Yan Nawa",        "ยานนาวา",     100.5274, 13.6924),
    ("Chatuchak",       "จตุจักร",      100.5535, 13.8054),
    ("Bang Kapi",       "บางกะปิ",     100.6442, 13.7669),
    ("Bang Khen",       "บางเขน",      100.5957, 13.8753),
    ("Don Mueang",      "ดอนเมือง",    100.5912, 13.9170),
    ("Lat Krabang",     "ลาดกระบัง",    100.7732, 13.7223),
    ("Lat Phrao",       "ลาดพร้าว",    100.6225, 13.8079),
    ("Wang Thonglang",  "วังทองหลาง", 100.6010, 13.7976),
    ("Phra Khanong",    "พระโขนง",    100.6014, 13.7106),
    ("Bang Sue",        "บางซื่อ",      100.5378, 13.8082),
    ("Bang Khun Thian", "บางขุนเทียน", 100.4347, 13.6606),
    ("Bang Na",         "บางนา",       100.6047, 13.6680),
]

LANDMARKS: list[tuple[str, str, float, float]] = [
    ("Mo Chit BTS",         "BTS หมอชิต",      100.5530, 13.8025),
    ("Asok BTS",            "BTS อโศก",        100.5602, 13.7372),
    ("Siam BTS",            "BTS สยาม",        100.5340, 13.7456),
    ("Pratunam",            "ประตูน้ำ",       100.5407, 13.7515),
    ("Khao San Rd",         "ถนนข้าวสาร",    100.4969, 13.7589),
    ("Yaowarat Rd",         "ถนนเยาวราช",    100.5095, 13.7406),
    ("Lumphini Park",       "สวนลุมพินี",    100.5418, 13.7307),
    ("Silom Rd",            "ถนนสีลม",       100.5274, 13.7282),
    ("Sukhumvit Rd",        "ถนนสุขุมวิท",   100.5660, 13.7395),
    ("Phaholyothin Rd",     "ถนนพหลโยธิน", 100.5957, 13.8753),
    ("Ratchadaphisek Rd",   "ถนนรัชดาภิเษก", 100.5742, 13.7693),
    ("Saen Saep Canal",     "คลองแสนแสบ",   100.5752, 13.7430),
    ("Chinatown",           "ไชน่าทาวน์",    100.5128, 13.7409),
]

ALL_PLACES = [*DISTRICTS, *LANDMARKS]


@dataclass
class Geocode:
    label_en: str
    label_th: str
    lng: float
    lat: float


def lookup_location(text: str) -> Geocode | None:
    if not text:
        return None
    for en, th, lng, lat in ALL_PLACES:
        if en.lower() in text.lower() or th in text:
            return Geocode(en, th, lng, lat)
    return None
