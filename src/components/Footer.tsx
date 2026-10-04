import React from 'react';
import { Compass, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950 py-8 text-neutral-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-pirate text-amber-500 font-bold tracking-wider">ONE PIECE</span>
          <span>·</span>
          <span>مانجا ون بيس من تأليف ورسم إييتشيرو أودا (Eiichiro Oda)</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <span>دليل وروابط فصول مانجا ون بيس باللغة العربية</span>
          <span>·</span>
          <span className="font-mono text-neutral-500">Shueisha / Weekly Shonen Jump</span>
        </div>
      </div>
    </footer>
  );
};
