import type { CategoryMeta } from './types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'rail',
    label: { en: 'BTS / MRT', th: 'รถไฟฟ้า BTS / MRT' },
    color: '#3a8dde',
    tagline: {
      en: 'Standing too close to the platform edge',
      th: 'ยืนเลยเส้นเหลืองชานชาลา',
    },
  },
  {
    id: 'motorbike',
    label: { en: 'Motorbike taxi', th: 'มอเตอร์ไซค์รับจ้าง' },
    color: '#ff5a8a',
    tagline: {
      en: 'Riding sidesaddle with no helmet',
      th: 'นั่งซ้อนท้ายไม่ใส่หมวกกันน็อก',
    },
  },
  {
    id: 'klong_boat',
    label: { en: 'Klong boat', th: 'เรือคลอง' },
    color: '#3aa6a0',
    tagline: {
      en: 'Leaning out over the wake',
      th: 'โน้มตัวลงไปจุ่มมือในคลอง',
    },
  },
  {
    id: 'electrocution',
    label: { en: 'Electrocution', th: 'ไฟดูด' },
    color: '#ffd23f',
    tagline: {
      en: 'Wading past a leaning power pole',
      th: 'ลุยน้ำท่วมข้างเสาไฟฟ้า',
    },
  },
  {
    id: 'soi_dog',
    label: { en: 'Soi dog', th: 'หมาซอย' },
    color: '#ff9a3c',
    tagline: {
      en: 'Jogging through a pack of strays at 2am',
      th: 'วิ่งจ๊อกกิ้งผ่านฝูงหมาตอนตีสอง',
    },
  },
  {
    id: 'billboard',
    label: { en: 'Falling billboard', th: 'ป้ายโฆษณาล้ม' },
    color: '#e94545',
    tagline: {
      en: 'Standing under a giant sign on a windy day',
      th: 'ยืนใต้ป้ายโฆษณาตอนพายุเข้า',
    },
  },
  {
    id: 'construction',
    label: { en: 'Construction', th: 'งานก่อสร้าง' },
    color: '#ff7a5a',
    tagline: {
      en: 'Walking under an unfinished skytrain pier',
      th: 'เดินใต้สะพานยกระดับที่ยังก่อสร้างไม่เสร็จ',
    },
  },
  {
    id: 'songkran',
    label: { en: 'Songkran', th: 'สงกรานต์' },
    color: '#7ad7c1',
    tagline: {
      en: 'Dancing on a wet pickup truck bed',
      th: 'ยืนสาดน้ำบนกระบะที่กำลังวิ่ง',
    },
  },
  {
    id: 'pollution',
    label: { en: 'PM2.5', th: 'ฝุ่น PM2.5' },
    color: '#3a3f55',
    tagline: {
      en: 'Doing sprints when the AQI hits 250',
      th: 'วิ่งออกกำลังตอนค่าฝุ่นแตะ 250',
    },
  },
  {
    id: 'tuktuk',
    label: { en: 'Tuk-tuk', th: 'ตุ๊ก ๆ' },
    color: '#7a5af8',
    tagline: {
      en: 'Hanging out the side for a TikTok',
      th: 'โหนตุ๊ก ๆ ถ่ายคลิป',
    },
  },
  {
    id: 'street_food',
    label: { en: 'Street food', th: 'อาหารริมทาง' },
    color: '#5bc46b',
    tagline: {
      en: 'Standing next to a leaking gas cylinder',
      th: 'ยืนติดถังแก๊สที่รั่ว',
    },
  },
  {
    id: 'flood',
    label: { en: 'Flood', th: 'น้ำท่วม' },
    color: '#3a8dde',
    tagline: {
      en: 'Riding a jet ski down Sukhumvit',
      th: 'ขับเจ็ตสกีบนถนนสุขุมวิทตอนน้ำท่วม',
    },
  },
];

export const CATEGORIES_BY_ID: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);
