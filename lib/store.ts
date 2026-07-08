'use client';

import { create } from 'zustand';
import type { CategoryId, Lang } from './types';

interface AppState {
  lang: Lang;
  activeCategory: CategoryId | null;
  /** Cross-cutting filter: only fat-tail / black-swan incidents, from any category. */
  blackSwanOnly: boolean;
  selectedIncidentId: string | null;
  setLang: (l: Lang) => void;
  setActiveCategory: (c: CategoryId | null) => void;
  setBlackSwanOnly: (v: boolean) => void;
  setSelectedIncidentId: (id: string | null) => void;
}

export const useApp = create<AppState>((set) => ({
  lang: 'en',
  activeCategory: null,
  blackSwanOnly: false,
  selectedIncidentId: null,
  setLang: (lang) => set({ lang }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setBlackSwanOnly: (blackSwanOnly) => set({ blackSwanOnly }),
  setSelectedIncidentId: (selectedIncidentId) => set({ selectedIncidentId }),
}));
