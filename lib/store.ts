'use client';

import { create } from 'zustand';
import type { CategoryId, Lang } from './types';

interface AppState {
  lang: Lang;
  activeCategory: CategoryId | null;
  selectedIncidentId: string | null;
  setLang: (l: Lang) => void;
  setActiveCategory: (c: CategoryId | null) => void;
  setSelectedIncidentId: (id: string | null) => void;
}

export const useApp = create<AppState>((set) => ({
  lang: 'en',
  activeCategory: null,
  selectedIncidentId: null,
  setLang: (lang) => set({ lang }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setSelectedIncidentId: (selectedIncidentId) => set({ selectedIncidentId }),
}));
