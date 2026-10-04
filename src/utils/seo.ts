export interface ChapterSeoData {
  number: number;
  titleAr?: string;
  titleEn?: string;
  summary?: string;
  arc?: string;
  url?: string;
}

export const getChapterKeywords = (chapterNumber: number, arc?: string): string[] => {
  return [
    `مانجا ون بيس الفصل ${chapterNumber}`,
    `ون بيس ${chapterNumber} مترجم عربي`,
    `قراءة مانجا ون بيس الفصل ${chapterNumber}`,
    `تحميل مانجا ون بيس ${chapterNumber}`,
    `ون بيس فصل ${chapterNumber} شات اوتاكو`,
    `one piece chapter ${chapterNumber} arabic`,
    `manga one piece ${chapterNumber} ar`,
    `one piece ${chapterNumber} english translation`,
    `chatotakou one piece ${chapterNumber}`,
    `ون بيس ${chapterNumber} جودة عالية`,
    arc ? `ون بيس ${arc}` : 'ون بيس إلباف',
    'مانجا ون بيس مترجمة',
    'فصول ون بيس اون لاين',
    'تسريبات ون بيس',
  ];
};

export const getChapterSeoTitle = (chapterNumber: number, titleAr?: string): string => {
  if (titleAr) {
    return `مانجا ون بيس الفصل ${chapterNumber} مترجم عربي (${titleAr}) | One Piece Chapter ${chapterNumber} Arabic`;
  }
  return `مانجا ون بيس الفصل ${chapterNumber} مترجم عربي كامل اون لاين | One Piece Chapter ${chapterNumber} Arabic`;
};

export const getChapterSeoDescription = (
  chapterNumber: number,
  titleAr?: string,
  summary?: string
): string => {
  if (summary) {
    return `قراءة مانجا ون بيس الفصل ${chapterNumber} مترجم عربي كامل بجودة عالية: ${summary} - على شات أوتاكو ChatOtakou.`;
  }
  return `قراءة وتحميل مانجا ون بيس الفصل ${chapterNumber} مترجم عربي اون لاين مجاناً بجودة فائقة. روابط قراءة مباشرة وتفاصيل الفصل ${chapterNumber} على شات أوتاكو ChatOtakou.`;
};

export const getChapterSlug = (chapterNumber: number): string => {
  return `/manga-one-piece-chapter-${chapterNumber}-arabic`;
};

export const applyChapterSeo = (data: ChapterSeoData) => {
  const { number, titleAr, summary, arc } = data;
  const title = getChapterSeoTitle(number, titleAr);
  const description = getChapterSeoDescription(number, titleAr, summary);
  const keywords = getChapterKeywords(number, arc).join(', ');
  const canonicalUrl = `${window.location.origin}/manga-one-piece-chapter-${number}-arabic`;

  // Update Page Title
  document.title = title;

  // Helper to set or update meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      if (isProperty) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('keywords', keywords);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('og:type', 'article', true);
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Schema.org JSON-LD Structured Data
  let scriptEl = document.querySelector('#seo-json-ld');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'seo-json-ld';
    scriptEl.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptEl);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ComicIssue',
    name: `One Piece Chapter ${number} (مانجا ون بيس الفصل ${number})`,
    headline: title,
    issueNumber: number.toString(),
    inLanguage: 'ar',
    description: description,
    publisher: {
      '@type': 'Organization',
      name: 'ChatOtakou & One Piece Arabic Hub',
      url: 'https://chatotakou.com/',
    },
    isPartOf: {
      '@type': 'ComicSeries',
      name: 'One Piece (ون بيس)',
      author: {
        '@type': 'Person',
        name: 'Eiichiro Oda (إييتشيرو أودا)',
      },
    },
    url: canonicalUrl,
  };

  scriptEl.textContent = JSON.stringify(structuredData);
};
