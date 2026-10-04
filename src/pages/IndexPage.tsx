import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Chapter, ViewMode, SortOption } from '../types/manga';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { ChapterFilterBar } from '../components/ChapterFilterBar';
import { ChapterCard } from '../components/ChapterCard';
import { ChapterListItem } from '../components/ChapterListItem';
import { Footer } from '../components/Footer';
import { BookOpen, Compass, ExternalLink } from 'lucide-react';

interface IndexPageProps {
  chapters: Chapter[];
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteChapter: (id: string) => void;
  onSaveChapter: (chapterData: Partial<Chapter>) => void;
  showToast: (msg: string) => void;
}

export const IndexPage: React.FC<IndexPageProps> = ({
  chapters,
  onToggleRead,
  onToggleFavorite,
  onDeleteChapter,
  onSaveChapter,
  showToast,
}) => {
  const navigate = useNavigate();

  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArc, setSelectedArc] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'favorites'>('all');

  // Filtered & Sorted Chapters
  const filteredChapters = useMemo(() => {
    return chapters
      .filter((c) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchNumber = c.number.toString().includes(q);
          const matchTitleAr = c.titleAr.toLowerCase().includes(q);
          const matchTitleEn = c.titleEn?.toLowerCase().includes(q);
          const matchSummary = c.summary?.toLowerCase().includes(q);
          if (!matchNumber && !matchTitleAr && !matchTitleEn && !matchSummary) {
            return false;
          }
        }

        // Status filter
        if (filterStatus === 'unread' && c.isRead) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'newest') return b.number - a.number;
        if (sortOption === 'oldest') return a.number - b.number;
        return b.number - a.number;
      });
  }, [chapters, searchQuery, filterStatus, sortOption]);

  const handleReadChapter = (chapter: Chapter) => {
    navigate(`/chapter/${chapter.number}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-cairo">
      {/* Clean Top Bar Header */}
      <Header totalChapters={chapters.length} />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner
          chapters={chapters}
          onReadLatest={(chapter) => handleReadChapter(chapter)}
        />

        {/* Content Container */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          
          {/* Direct ChatOtakou Links Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200/95">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>فهرس فصول ون بيس (1194 إلى 1260):</strong> اضغط على أي فصل لتقرأه مباشرة على موقع{' '}
                <a
                  href="https://chatotakou.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-amber-300 hover:text-white"
                >
                  chatotakou.com
                </a>
                .
              </span>
            </div>
            
            <a
              href="https://chatotakou.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shrink-0 cursor-pointer shadow-sm"
            >
              <span>فتح موقع ChatOtakou</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter, Search & View Controls */}
          <ChapterFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedArc={selectedArc}
            onArcChange={setSelectedArc}
            sortOption={sortOption}
            onSortChange={setSortOption}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            totalFiltered={filteredChapters.length}
          />

          {/* Chapters Output: Grid or List */}
          {filteredChapters.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    onRead={handleReadChapter}
                    onToggleRead={onToggleRead}
                    onToggleFavorite={onToggleFavorite}
                    onEdit={() => {}}
                    onDelete={onDeleteChapter}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredChapters.map((chapter) => (
                  <ChapterListItem
                    key={chapter.id}
                    chapter={chapter}
                    onRead={handleReadChapter}
                    onToggleRead={onToggleRead}
                    onToggleFavorite={onToggleFavorite}
                    onEdit={() => {}}
                    onDelete={onDeleteChapter}
                  />
                ))}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
                <BookOpen className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-base font-bold text-neutral-200 mb-1">
                لا توجد فصول تطابق بحثك حالياً
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
                {searchQuery
                  ? `لم نجد أي فصل يحتوي على "${searchQuery}". جرب البحث برقم آخر.`
                  : 'لا توجد فصول للعرض حالياً.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-xs font-medium text-neutral-300 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  مسح البحث
                </button>
              )}
            </div>
          )}

          {/* About Straw Hat Banner */}
          <div className="mt-12 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-3 flex justify-center">
                <div className="relative w-36 h-48 rounded-xl overflow-hidden border border-neutral-700 shadow-2xl">
                  <img
                    src="/src/assets/images/one_piece_emblem_1791147663746.jpg"
                    alt="One Piece Pirate Emblem"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 inset-x-2 text-center text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                    Straw Hat Pirates
                  </div>
                </div>
              </div>

              <div className="md:col-span-9 space-y-2.5">
                <h3 className="text-lg font-bold text-neutral-100 font-cairo">
                  فهرس فصول ون بيس وقراءة مباشرة على ChatOtakou
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  تصفح فصول مانجا ون بيس المترجمة باللغة العربية مع روابط مباشرة وتحويل تلقائي فوري إلى موقع <strong>chatotakou.com</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-400">
                  <span>الرابط المستهدف: <strong className="text-amber-400 font-mono">https://chatotakou.com/</strong></span>
                  <span>·</span>
                  <span>نطاق الفصول: <strong>من #1194 إلى #1260</strong></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
};
