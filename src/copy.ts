export const copy = {
  fa: {
    navProjects: 'پروژه‌ها', navReleases: 'انتشارها', navAbout: 'درباره من', skip: 'رفتن به محتوای اصلی',
    badge: 'پورتفولیوی توسعه‌دهنده', heroA: 'متین', heroB: 'رمضانی', intro: 'سلام، من متینم. اینجا پروژه‌هام رو گذاشتم؛ از اپ‌های اندروید و بازی گرفته تا سایت و ابزارهای پایتون.',
    consoleLabel: 'کنسول پیمایش سایت', consoleDirectory: 'مسیرهای سایت', consoleInput: 'فرمان پیمایش', consoleSubmit: 'اجرای فرمان', consoleUnknown: 'این دستور رو نمی‌شناسم. برای دیدن گزینه‌ها بنویس help.', linksLabel: 'لینک‌ها', techFilter: 'فناوری',
    explore: 'دیدن پروژه‌ها', downloads: 'دانلودها', featured: 'منتخب', projectsLabel: 'نمونه‌کارها',
    projectIntro: 'دنبال یه پروژهٔ خاصی می‌گردی؟ از جست‌وجو یا فیلترها کمک بگیر.', search: 'دنبال چی می‌گردی؟', all: 'همه', mobile: 'موبایل', tools: 'ابزارها', testing: 'تست', ui: 'طراحی رابط', web: 'وب',
    source: 'کد روی گیت‌هاب', demo: 'دمو', caseStudy: 'مطالعهٔ موردی', github: 'گیت‌هاب', noProjects: 'چیزی پیدا نشد. یه عبارت دیگه امتحان کن.', countLabel: 'پروژه',
    releasesLabel: 'نسخه‌های پایدار', releaseIntro: 'اگه پروژه‌ای فایل دانلود داشته باشه، نسخه‌های پایدارش رو اینجا پیدا می‌کنی.',
    syncBadge: 'همگام با GitHub', noReleases: 'فعلاً فایلی برای دانلود نیست', noReleasesBody: 'هر وقت نسخهٔ پایداری روی گیت‌هاب بذارم، بعد از به‌روزرسانی سایت اینجا میاد.',
    releaseOnGithub: 'دیدن توی گیت‌هاب', notes: 'چی عوض شده؟', noAssets: 'این نسخه فایل جداگانه‌ای برای دانلود نداره.', stable: 'پایدار', about: 'یه کم دربارهٔ من',
    aboutBio: 'من متین رمضانی‌ام. اگه دوست داری کارهای دیگه‌ام رو هم ببینی، لینک گیت‌هابم همین‌جاست.', toolsLabel: 'زبان‌ها و ابزارها',
    profile: 'گیت‌هاب من', top: 'برگرد به بالا', themeLight: 'فعال کردن حالت روشن', themeDark: 'فعال کردن حالت تیره', language: 'Switch to English',
    publishedStudy: 'معرفی عمومی', updated: 'آخرین به‌روزرسانی', downloadWord: 'دانلود', projectOne: 'پروژه', projectMany: 'پروژه‌ها',
  },
  en: {
    navProjects: 'Projects', navReleases: 'Releases', navAbout: 'About', skip: 'Skip to content',
    badge: 'Developer portfolio', heroA: 'Matin', heroB: 'Ramezani', intro: 'Hey, I’m Matin. Here’s what I’ve been building, from Android apps and games to websites and Python tools.',
    consoleLabel: 'Site command prompt', consoleDirectory: 'Site directories', consoleInput: 'Navigation command', consoleSubmit: 'Run command', consoleUnknown: 'I don’t know that command. Type help to see what works.', linksLabel: 'Links', techFilter: 'Technology',
    explore: 'See my projects', downloads: 'Downloads', featured: 'Featured', projectsLabel: 'Selected work',
    projectIntro: 'Looking for something specific? Try a search or pick a category.', search: 'Search projects…', all: 'All', mobile: 'Mobile', tools: 'Tools', testing: 'Testing', ui: 'UI', web: 'Web',
    source: 'Source code', demo: 'Demo', caseStudy: 'Case study', github: 'GitHub', noProjects: 'Nothing turned up. Try a different search.', countLabel: 'projects',
    releasesLabel: 'Stable releases', releaseIntro: 'If there’s a stable build you can download, you’ll find it here.',
    syncBadge: 'Synced with GitHub', noReleases: 'Nothing to download yet', noReleasesBody: 'When I put a stable build on GitHub, it’ll show up here after the site updates.',
    releaseOnGithub: 'View on GitHub', notes: 'What changed?', noAssets: 'There’s no separate file to download for this release.', stable: 'Stable', about: 'A bit about me',
    aboutBio: 'I’m Matin Ramezani. If you’d like to see what else I’m working on, my GitHub is right here.', toolsLabel: 'Languages & tools',
    profile: 'My GitHub', top: 'Back to top', themeLight: 'Use light theme', themeDark: 'Use dark theme', language: 'تغییر زبان به فارسی',
    publishedStudy: 'Public case study', updated: 'Last updated', downloadWord: 'downloads', projectOne: 'project', projectMany: 'projects',
  },
};

export type Language = keyof typeof copy;
