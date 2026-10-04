import React, { useState } from 'react';
import { Chapter } from '../types/manga';
import { X, Download, Upload, RotateCcw, Check, AlertTriangle, FileCode } from 'lucide-react';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  onImport: (chapters: Chapter[]) => void;
  onReset: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  chapters,
  onImport,
  onReset,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleExportDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(chapters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `one_piece_arabic_chapters_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setStatusMsg({ type: 'success', text: 'تم تحميل ملف النسخة الاحتياطية بنجاح!' });
  };

  const handleImportText = () => {
    try {
      if (!jsonText.trim()) {
        setStatusMsg({ type: 'error', text: 'يرجى لصق بيانات JSON أولاً' });
        return;
      }
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setStatusMsg({ type: 'error', text: 'صيغة الملف غير صحيحة: يجب أن تكون مصفوفة فصول' });
        return;
      }
      onImport(parsed);
      setStatusMsg({ type: 'success', text: `تم استيراد ${parsed.length} فصلاً بنجاح!` });
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'خطأ في تنسيق JSON. تأكد من صحة الكود.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          onImport(parsed);
          setStatusMsg({ type: 'success', text: `تم استيراد ${parsed.length} فصلاً من الملف بنجاح!` });
          setTimeout(() => {
            onClose();
          }, 1200);
        } else {
          setStatusMsg({ type: 'error', text: 'الملف لا يحتوي على مصفوفة فصول صحيحة' });
        }
      } catch (err) {
        setStatusMsg({ type: 'error', text: 'تعذر قراءة ملف JSON' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-neutral-100">
              النسخ الاحتياطي وإدارة البيانات
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMsg && (
          <div
            className={`mb-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                : 'bg-rose-950/60 text-rose-300 border border-rose-800'
            }`}
          >
            {statusMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Export Box */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold text-neutral-200">1. تصدير الفصول وحفظها (Export)</h4>
            <p className="text-xs text-neutral-400">
              حمّل جميع الفصول المضافة وروابطها في ملف JSON للرجوع إليها في أي وقت.
            </p>
            <button
              onClick={handleExportDownload}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>تحميل ملف JSON ({chapters.length} فصل)</span>
            </button>
          </div>

          {/* Import Box */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
            <h4 className="text-xs font-bold text-neutral-200">2. استيراد فصول سابقة (Import)</h4>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 text-xs text-neutral-200">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>اختر ملف من جهازك</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-[11px] text-neutral-500">أو الصق كود JSON أدناه:</span>
            </div>

            <textarea
              rows={3}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="الصق كود JSON هنا..."
              className="w-full text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-neutral-300 focus:outline-none focus:border-amber-400 resize-none text-left"
              dir="ltr"
            />

            {jsonText && (
              <button
                onClick={handleImportText}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold text-xs hover:bg-amber-300"
              >
                تطبيق الاستيراد
              </button>
            )}
          </div>

          {/* Reset Box */}
          <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
            <span>استعادة القائمة الأولية الرسمية؟</span>
            <button
              onClick={() => {
                if (window.confirm('هل أنت متأكد من استعادة الفصول الافتراضية؟')) {
                  onReset();
                  setStatusMsg({ type: 'success', text: 'تمت استعادة القائمة الأولية!' });
                  setTimeout(() => onClose(), 1000);
                }
              }}
              className="text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط المصنع</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
