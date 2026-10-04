import { Chapter, ArcOption } from '../types/manga';

export const ONE_PIECE_ARCS: ArcOption[] = [
  { id: 'final_saga', nameAr: 'الملحمة الأخيرة (إلباف وما بعدها)', nameEn: 'Final Saga', startChapter: 1126 },
  { id: 'elbaf', nameAr: 'آرك إلباف (أرض العمالقة)', nameEn: 'Elbaf Arc', startChapter: 1126, endChapter: 1260 },
  { id: 'egghead', nameAr: 'آرك إيغ هيد (جزيرة المستقبل)', nameEn: 'Egghead Arc', startChapter: 1058, endChapter: 1125 },
  { id: 'wano', nameAr: 'آرك بلاد وانو', nameEn: 'Wano Country Arc', startChapter: 909, endChapter: 1057 },
  { id: 'wholecake', nameAr: 'آرك جزيرة الكعكة الكاملة', nameEn: 'Whole Cake Island Arc', startChapter: 825, endChapter: 902 },
  { id: 'dressrosa', nameAr: 'آرك دريسروزا', nameEn: 'Dressrosa Arc', startChapter: 700, endChapter: 801 },
  { id: 'classic', nameAr: 'الآركات الكلاسيكية السابقة', nameEn: 'Classic Arcs', startChapter: 1, endChapter: 699 },
];

// Generate chapters from 1260 down to 1194
const generateChapters1194To1260 = (): Chapter[] => {
  const chaptersList: Chapter[] = [];
  
  // Custom titles for special highlight chapters in this sequence
  const specialTitles: Record<number, { titleAr: string; titleEn: string; summary: string }> = {
    1260: {
      titleAr: 'الفصل 1260 - ذروة صراع العروش والكنز الأعظم ون بيس',
      titleEn: 'Climax of the Battle for the Throne',
      summary: 'الفصل 1260 الأسطوري: احتدام المعركة الحاسمة في الملحمة الأخيرة واقتراب لوفي وطاقمه من تحقيق الحلم.',
    },
    1255: {
      titleAr: 'الفصل 1255 - أسرار القرن الفارط وسر الضحكة',
      titleEn: 'Secrets of the Void Century',
      summary: 'كشف حقائق مدوية عن القرن الفارط والأسلحة القديمة وسر إرادة الدي D.',
    },
    1250: {
      titleAr: 'الفصل 1250 - معركة الجبابرة في العالم الجديد',
      titleEn: 'Battle of the Titans',
      summary: 'مواجهة كبرى بين قوى اليونكو وحكومة العالم وجيش الثوار تهز أرجاء البحار.',
    },
    1240: {
      titleAr: 'الفصل 1240 - صمود طاقم قبعة القش',
      titleEn: 'Straw Hats Resolute',
      summary: 'تحركات استراتيجية لزورو وسانجي وجيمبي وباقي الطاقم لحماية حلفائهم.',
    },
    1230: {
      titleAr: 'الفصل 1230 - أسطورة شجرة آدم وقلعة إلباف',
      titleEn: 'The Legend of Treasure Tree Adam',
      summary: 'أسرار الشجرة العظيمة في إلباف وتاريخ محاربي الفايكنج الأسطوريين.',
    },
    1220: {
      titleAr: 'الفصل 1220 - تحالف الفرسان المقدسين وإلباف',
      titleEn: 'Holy Knights & The Giants',
      summary: 'اشتعال المواجهة وتدخل الفرسان المقدسين في شؤون أرض العمالقة.',
    },
    1210: {
      titleAr: 'الفصل 1210 - سر الأمير لوكي والفاكهة الأسطورية',
      titleEn: 'Prince Loki & The Mythical Fruit',
      summary: 'لوفي يكشف حقيقة فاكهة الأمير لوكي المحبوس في أغلال الكايروسيكي.',
    },
    1200: {
      titleAr: 'الفصل 1200 - المئوية الثانية عشرة: فجر العصر الجديد',
      titleEn: 'Chapter 1200: Dawn of the New Age',
      summary: 'فصل المئوية الاستثنائي 1200: تطورات كبرى تغير موازين القوى في الجراند لاين.',
    },
    1194: {
      titleAr: 'الفصل 1194 - مغامرة إلباف: فك قيود العمالقة',
      titleEn: 'Elbaf Adventure: Unshackling the Giants',
      summary: 'بداية فصول الملحمة على موقع شات أوتاكو: مغامرة مثيرة للوفي وطاقم قبعة القش في إلباف.',
    },
  };

  const baseDate = new Date(2026, 9, 4); // Current date baseline

  for (let num = 1260; num >= 1194; num--) {
    const diffWeeks = 1260 - num;
    const chapterDate = new Date(baseDate.getTime() - diffWeeks * 7 * 24 * 60 * 60 * 1000);
    const dateStr = chapterDate.toISOString().split('T')[0];

    const custom = specialTitles[num];
    const titleAr = custom ? custom.titleAr : `الفصل ${num} - مانجا ون بيس مترجم بالعربية`;
    const titleEn = custom ? custom.titleEn : `One Piece Chapter ${num}`;
    const summary = custom
      ? custom.summary
      : `قراءة الفصل ${num} من مانجا ون بيس مترجم حصرياً باللغة العربية عبر سيرفرات موقع شات أوتاكو (ChatOtakou).`;

    chaptersList.push({
      id: `ch-${num}`,
      number: num,
      titleAr,
      titleEn,
      url: 'https://chatotakou.com/',
      secondaryUrl: 'https://chatotakou.com/',
      arc: 'آرك إلباف (أرض العمالقة)',
      saga: 'الملحمة الأخيرة',
      releaseDate: dateStr,
      scanlationGroup: 'شات أوتاكو ChatOtakou',
      summary,
      isRead: num < 1200, // sample read status
      isFavorite: num % 10 === 0 || num === 1260 || num === 1194,
      rating: num === 1260 || num === 1200 ? 5 : 4,
      createdAt: chapterDate.getTime(),
    });
  }

  return chaptersList;
};

export const INITIAL_CHAPTERS: Chapter[] = generateChapters1194To1260();
