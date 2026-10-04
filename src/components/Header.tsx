import React from 'react';
import { ExternalLink } from 'lucide-react';

interface HeaderProps {
  totalChapters: number;
}

export const Header: React.FC<HeaderProps> = ({ totalChapters }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-neutral-100 hover:text-amber-400 transition-colors"
        >
          <span className="font-pirate text-amber-500 text-2xl">ONE PIECE</span>
          <span className="text-sm font-medium text-neutral-400">· فصول بالعربية</span>
        </a>

        {/* Zone 2: Clean title indicator */}
        <div className="hidden md:flex items-center text-xs font-semibold text-neutral-400">
          <span>فهرس فصول ون بيس المترجمة (1194 إلى 1260) · {totalChapters} فصل</span>
        </div>

        {/* Zone 3: Primary action button to chatotakou.com */}
        <div className="flex items-center gap-3">
          <a
            href="https://chatotakou.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            <span>زيارة chatotakou.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
