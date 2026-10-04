import React from 'react';
import { Search, LayoutGrid, List, X } from 'lucide-react';
import { ViewMode, SortOption } from '../types/manga';

interface ChapterFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedArc: string;
  onArcChange: (arc: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  filterStatus: 'all' | 'unread' | 'favorites';
  onFilterStatusChange: (status: 'all' | 'unread' | 'favorites') => void;
  totalFiltered: number;
}

export const ChapterFilterBar: React.FC<ChapterFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedArc,
  onArcChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  filterStatus,
  onFilterStatusChange,
  totalFiltered,
}) => {
  return (
    <div className="space-y-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
      {/* Top Row: Search & View Toggles */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث برقم الفصل (مثلاً 1194 أو 1260)..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pr-10 pl-9 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/80 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode & Sort Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status selector */}
          <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-lg">
            <button
              onClick={() => onFilterStatusChange('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filterStatus === 'all'
                  ? 'bg-neutral-800 text-amber-400 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              جميع الفصول
            </button>
            <button
              onClick={() => onFilterStatusChange('unread')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filterStatus === 'unread'
                  ? 'bg-neutral-800 text-amber-400 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              غير المقروءة
            </button>
          </div>

          {/* Sort selector */}
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="newest">الأحدث أولاً (1260 ⭢ 1194)</option>
            <option value="oldest">الأقدم أولاً (1194 ⭢ 1260)</option>
          </select>

          {/* Grid / List toggle */}
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded ${
                viewMode === 'grid' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="عرض الشبكة"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="عرض القائمة"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Info indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
        <span>الفصول من 1194 إلى 1260 متوفرة للقراءة المباشرة على chatotakou.com</span>
        <span className="font-mono text-amber-400 tabular-nums">({totalFiltered} فصل معروض)</span>
      </div>
    </div>
  );
};
