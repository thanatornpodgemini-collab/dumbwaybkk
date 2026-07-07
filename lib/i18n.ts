import type { Lang } from './types';

export const STRINGS = {
  appTitle: { en: 'Dumb Ways to Die in Bangkok', th: 'วิธีตายงี่เง่าในกรุงเทพ' },
  appSubtitle: {
    en: 'A field guide to incidents from the last ten years of Thai news.',
    th: 'คู่มือสำรวจอุบัติเหตุจากข่าวไทยย้อนหลัง 10 ปี',
  },
  filterAll: { en: 'All categories', th: 'ทุกหมวด' },
  filtersLabel: { en: 'Filter by category', th: 'กรองตามหมวด' },
  legendCount: { en: 'incidents', th: 'เหตุการณ์' },
  victims: { en: 'people affected', th: 'ผู้ได้รับผลกระทบ' },
  sources: { en: 'Sources', th: 'แหล่งข่าว' },
  seedNotice: {
    en: 'Showing curated seed data — run the scraper to load live incidents.',
    th: 'ข้อมูลตัวอย่าง — รันสแครปเปอร์เพื่อโหลดเหตุการณ์จริง',
  },
  dataNotice: {
    en: 'real incidents from Thai news, 2020–2026 — every marker links to its source.',
    th: 'เหตุการณ์จริงจากข่าวไทย ปี 2563–2569 — ทุกหมุดลิงก์ไปยังแหล่งข่าว',
  },
  blackSwan: { en: 'Black swan', th: 'หงส์ดำ' },
  whatFailed: { en: 'The systems that failed', th: 'ระบบที่ล้มเหลว' },
  everydayHazards: { en: 'Everyday hazards', th: 'อันตรายในชีวิตประจำวัน' },
  blackSwanSection: { en: 'Black swans — it all failed at once', th: 'หงส์ดำ — ทุกระบบล้มเหลวพร้อมกัน' },
  langToggleEN: { en: 'EN', th: 'EN' },
  langToggleTH: { en: 'TH', th: 'ไทย' },
  severity: {
    fatal: { en: 'Fatal', th: 'เสียชีวิต' },
    injury: { en: 'Injury', th: 'บาดเจ็บ' },
    near_miss: { en: 'Near miss', th: 'เฉียดตาย' },
  },
} as const;

export function t<T extends { en: string; th: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}
