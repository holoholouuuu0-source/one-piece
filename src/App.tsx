import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Chapter } from './types/manga';
import { INITIAL_CHAPTERS } from './data/initialChapters';
import { IndexPage } from './pages/IndexPage';
import { ChapterPage } from './pages/ChapterPage';
import { CheckCircle2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'onepiece_arabic_chapters_v2_chatotakou';

// Wrapper for custom regex/param paths like /manga-one-piece-chapter-1148-arabic
const SlugChapterRouteWrapper: React.FC<{
  chapters: Chapter[];
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}> = ({ chapters, onToggleRead, onToggleFavorite }) => {
  const params = useParams();
  // Extract number from slug or route param
  let extractedNumber = '1148';
  const rawParam = params['*'] || params.number || '';
  const match = rawParam.match(/\d+/);
  if (match) {
    extractedNumber = match[0];
  }

  return (
    <ChapterPage
      chapters={chapters}
      onToggleRead={onToggleRead}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export default function App() {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasNewSeries = parsed.some((c: Chapter) => c.number >= 1194 && c.number <= 1260);
          if (hasNewSeries) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.error('Failed to load chapters from localStorage', e);
    }
    return INITIAL_CHAPTERS;
  });

  // Save on state change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chapters));
    } catch (e) {
      console.error('Failed to save chapters to localStorage', e);
    }
  }, [chapters]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Chapter CRUD handlers
  const handleSaveChapter = (chapterData: Partial<Chapter>) => {
    if (chapterData.id) {
      setChapters((prev) =>
        prev.map((c) =>
          c.id === chapterData.id ? ({ ...c, ...chapterData } as Chapter) : c
        )
      );
      showToast('تم تحديث بيانات الفصل بنجاح!');
    } else {
      const newChapter: Chapter = {
        id: `ch-${chapterData.number || Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        number: chapterData.number || 1,
        titleAr: chapterData.titleAr || 'فصل ون بيس جديد',
        titleEn: chapterData.titleEn,
        url: chapterData.url || 'https://chatotakou.com/',
        secondaryUrl: chapterData.secondaryUrl || 'https://chatotakou.com/',
        arc: chapterData.arc || 'آرك إلباف (أرض العمالقة)',
        saga: chapterData.saga || 'الملحمة الأخيرة',
        releaseDate: chapterData.releaseDate || new Date().toISOString().split('T')[0],
        scanlationGroup: chapterData.scanlationGroup || 'شات أوتاكو ChatOtakou',
        summary: chapterData.summary,
        isRead: false,
        isFavorite: false,
        rating: 5,
        createdAt: Date.now(),
      };
      setChapters((prev) => [newChapter, ...prev]);
      showToast(`تمت إضافة الفصل ${newChapter.number} برابط القراءة بنجاح!`);
    }
  };

  const handleDeleteChapter = (id: string) => {
    const target = chapters.find((c) => c.id === id);
    if (!target) return;
    if (window.confirm(`هل أنت متأكد من حذف الفصل ${target.number}؟`)) {
      setChapters((prev) => prev.filter((c) => c.id !== id));
      showToast(`تم حذف الفصل ${target.number}`);
    }
  };

  const handleToggleRead = (id: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isRead: !c.isRead } : c))
    );
    const updated = chapters.find((c) => c.id === id);
    if (updated) {
      showToast(updated.isRead ? `تم تحديد الفصل ${updated.number} كغير مقروء` : `تمت قراءة الفصل ${updated.number} بنجاح!`);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const handleResetChapters = () => {
    setChapters(INITIAL_CHAPTERS);
    showToast('تمت استعادة فصول ون بيس الافتراضية');
  };

  const handleImportChapters = (imported: Chapter[]) => {
    setChapters(imported);
    showToast(`تم استيراد ${imported.length} فصل بنجاح`);
  };

  return (
    <BrowserRouter>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-xs font-bold text-neutral-950 shadow-xl shadow-black/60 transition-all transform animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Routes>
        {/* Index Page with all chapters and links */}
        <Route
          path="/"
          element={
            <IndexPage
              chapters={chapters}
              onSaveChapter={handleSaveChapter}
              onDeleteChapter={handleDeleteChapter}
              onToggleRead={handleToggleRead}
              onToggleFavorite={handleToggleFavorite}
              showToast={showToast}
            />
          }
        />

        <Route
          path="/index"
          element={<Navigate to="/" replace />}
        />

        {/* Dedicated Standard Route: /chapter/:number */}
        <Route
          path="/chapter/:number"
          element={
            <ChapterPage
              chapters={chapters}
              onToggleRead={handleToggleRead}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        {/* Arabic SEO Route: /manga-one-piece-chapter-:number-arabic (e.g. 1148) */}
        <Route
          path="/manga-one-piece-chapter-:number-arabic"
          element={
            <ChapterPage
              chapters={chapters}
              onToggleRead={handleToggleRead}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        {/* Alternative SEO Route: /one-piece-chapter-:number-arabic */}
        <Route
          path="/one-piece-chapter-:number-arabic"
          element={
            <ChapterPage
              chapters={chapters}
              onToggleRead={handleToggleRead}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        {/* Alternative Route: /manga/one-piece/:number */}
        <Route
          path="/manga/one-piece/:number"
          element={
            <ChapterPage
              chapters={chapters}
              onToggleRead={handleToggleRead}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
