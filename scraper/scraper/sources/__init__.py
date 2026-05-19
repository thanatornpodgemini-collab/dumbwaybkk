"""Source registry."""
from .thairath import Thairath
from .khaosod import Khaosod
from .bangkokpost import BangkokPost

ALL_SOURCES = [Thairath, Khaosod, BangkokPost]
