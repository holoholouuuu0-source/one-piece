export interface Chapter {
  id: string;
  number: number;
  subNumber?: string;
  titleAr: string;
  titleEn?: string;
  url: string;
  secondaryUrl?: string;
  arc: string;
  saga: string;
  releaseDate: string;
  scanlationGroup?: string;
  summary?: string;
  isRead?: boolean;
  isFavorite?: boolean;
  rating?: number;
  notes?: string;
  createdAt: number;
}

export interface ArcOption {
  id: string;
  nameAr: string;
  nameEn: string;
  startChapter: number;
  endChapter?: number;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'newest' | 'oldest' | 'rating' | 'number';
