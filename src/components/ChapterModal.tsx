import React, { useState, useEffect } from 'react';
import { Chapter } from '../types/manga';
import { ONE_PIECE_ARCS } from '../data/initialChapters';
import { X, Link2, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chapterData: Partial<Chapter>) => void;
  initialData?: Chapter | null;
  latestChapterNumber: number;
}

export const ChapterModal: React.FC<ChapterModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  latestChapterNumber,
}) => {
  const [number, setNumber] = useState<number>(initialData ? initialData.number : latestChapterNumber + 1);
  const [titleAr, setTitleAr] = useState<string>(initialData ? initialData.titleAr : '');
  const [titleEn, setTitleEn] = useState<string>(initialData ? initialData.titleEn || '' : '');
  const [url, setUrl] = useState<string>(initialData ? initialData.url : '');
  const [secondaryUrl, setSecondaryUrl] = useState<string>(initialData ? initialData.secondaryUrl || '' : '');
  const [arc, setArc] = useState<string>(initialData ? initialData.arc : ONE_PIECE_ARCS[0].nameAr);
  const [scanlationGroup, setScanlationGroup] = useState<string>(
    initialData ? initialData.scanlationGroup || '' : 'فريق العاشق 3asq'
  );
  const [releaseDate, setReleaseDate] = useState<string>(
    initialData ? initialData.releaseDate : new Date().toISOString().split('T')[0]
  );
  const [summary, setSummary] = useState<string>(initialData ? initialData.summary || '' : '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setNumber(initialData.number);
      setTitleAr(initialData.titleAr);
      setTitleEn(initialData.titleEn || '');
      setUrl(initialData.url);
      setSecondaryUrl(initialData.secondaryUrl || '');
      setArc(initialData.arc);
      setScanlationGroup(initialData.scanlationGroup || '');
      setReleaseDate(initialData.releaseDate);
      setSummary(initialData.summary || '');
    } else {
      setNumber(latestChapterNumber + 1);
      setTitleAr('');
      setTitleEn('');
      setUrl('https://chatotakou.com/');
      setSecondaryUrl('');
      setArc(ONE_PIECE_ARCS[0].nameAr);
      setScanlationGroup('شات أوتاكو ChatOtakou');
      setReleaseDate(new Date().toISOString().split('T')[0]);
      setSummary('');
    }
    setError('');
  }, [initialData, latestChapterNumber, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim()) {
      setError('يرجى إدخال عنوان الفصل بالعربية');
      return;
    }
    if (!url.trim()) {
      setError('يرجى إدخال رابط قراءة الفصل');
      return;
    }

    // Basic URL validation
    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    let validSecUrl = secondaryUrl.trim();
    if (validSecUrl && !validSecUrl.startsWith('http://') && !validSecUrl.startsWith('https://')) {
      validSecUrl = 'https://' + validSecUrl;
    }

    onSave({
      ...(initialData ? { id: initialData.id } : {}),
      number: Number(number),
      titleAr: titleAr.trim(),
      titleEn: titleEn.trim() || undefined,
      url: validUrl,
      secondaryUrl: validSecUrl || undefined,
      arc,
      saga: arc.includes('إلباف') || arc.includes('إيغ هيد') ? 'الملحمة الأخيرة' : 'ون بيس',
      scanlationGroup: scanlationGroup.trim() || undefined,
      releaseDate,
      summary: summary.trim() || undefined,
    });

    onClose();
  };

  // Helper quick presets
  const handleQuickUrlFill = (prefix: string) => {
    setUrl(prefix);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>{initialData ? 'تعديل فصل مانجا ون بيس' : 'إضافة فصل جديد إلى القائمة'}</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              دخل معلومات الفصل والرابط لي غادي يوجه ليه القارئ
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-rose-950/50 border border-rose-800/60 p-3 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Number & Arc */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                رقم الفصل <span className="text-amber-400">*</span>
              </label>
              <input
                type="number"
                required
                value={number}
                onChange={(e) => setNumber(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                الآرك / القصة
              </label>
              <select
                value={arc}
                onChange={(e) => setArc(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                {ONE_PIECE_ARCS.map((a) => (
                  <option key={a.id} value={a.nameAr}>
                    {a.nameAr}
                  </option>
                ))}
                <option value="آرك خاص / جانبي">آرك خاص / جانبي</option>
              </select>
            </div>
          </div>

          {/* Row 2: Arabic Title */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              عنوان الفصل بالعربية <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: أمير اللعنة - لوكي عملاق إلباف"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Row 3: Read Link (URL) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-amber-400" />
                <span>رابط قراءة الفصل (الموقع أو المصدر)</span>
                <span className="text-amber-400">*</span>
              </label>
              <span className="text-[11px] text-neutral-500">يقبل أي رابط: 3asq, GManga, Drive...</span>
            </div>
            <input
              type="text"
              required
              dir="ltr"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 font-mono text-left focus:border-amber-400 focus:outline-none"
            />

            {/* Quick Link Presets Helper */}
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-neutral-400">
              <span className="text-neutral-500">أمثلة سريعة:</span>
              <button
                type="button"
                onClick={() => handleQuickUrlFill('https://chatotakou.com/')}
                className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold hover:bg-amber-500/30 border border-amber-500/40"
              >
                ChatOtakou
              </button>
              <button
                type="button"
                onClick={() => handleQuickUrlFill('https://3asq.org/manga/one-piece/')}
                className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-amber-300 border border-neutral-800"
              >
                3asq
              </button>
              <button
                type="button"
                onClick={() => handleQuickUrlFill('https://gmanga.org/mangas/one-piece')}
                className="px-1.5 py-0.5 rounded bg-neutral-900 hover:text-amber-300 border border-neutral-800"
              >
                GManga
              </button>
            </div>
          </div>

          {/* Row 4: Secondary Link & Translation Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                فريق الترجمة (المترجم)
              </label>
              <input
                type="text"
                placeholder="مثال: فريق العاشق، مانجا العرب..."
                value={scanlationGroup}
                onChange={(e) => setScanlationGroup(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                تاريخ النشر
              </label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 5: Summary */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              مقتطف أو ملخص الأحداث (اختياري)
            </label>
            <textarea
              rows={2}
              placeholder="اكتب نبذة موجزة عن أحداث هذا الفصل..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              {initialData ? 'حفظ التعديلات' : 'إضافة الفصل للقائمة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
