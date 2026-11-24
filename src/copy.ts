export const copy = {
  fa: {
    navProjects: 'پروژه‌ها', navReleases: 'انتشارها', navAbout: 'درباره من', skip: 'رفتن به محتوای اصلی',
    badge: 'پورتفولیوی توسعه‌دهنده', heroA: 'متین', heroB: 'رمضانی', intro: 'من متینم. اینجا اپلیکیشن‌ها، وب‌سایت‌ها و ابزارهایی را که ساخته‌ام، همراه با لینک اجرا یا دانلودشان پیدا می‌کنید.',
    consoleLabel: 'کنسول پیمایش سایت', consoleDirectory: 'مسیرهای سایت', consoleInput: 'فرمان پیمایش', consoleSubmit: 'اجرای فرمان', consoleUnknown: 'فرمان پیدا نشد. help را وارد کنید.', linksLabel: 'پیوندها', techFilter: 'فناوری',
    explore: 'مشاهدهٔ پروژه‌ها', downloads: 'مرکز دانلود', featured: 'منتخب', projectsLabel: 'نمونه‌کارها',
    projectIntro: 'اپلیکیشن‌ها، ابزارها و آزمایش‌هایی که ساخته‌ام.', search: 'جست‌وجوی پروژه‌…', all: 'همه', mobile: 'موبایل', tools: 'ابزارها', testing: 'تست', ui: 'طراحی رابط', web: 'وب',
    source: 'کد منبع', demo: 'دمو', caseStudy: 'مطالعهٔ موردی', github: 'گیت‌هاب', noProjects: 'پروژه‌ای با این جست‌وجو پیدا نشد.', countLabel: 'پروژه',
    releasesLabel: 'نسخه‌های پایدار', releaseIntro: 'نسخه‌های پایدار و LTS، یادداشت تغییرات و فایل‌های دانلود در یک جا.',
    syncBadge: 'همگام با GitHub', noReleases: 'هنوز نسخهٔ پایداری منتشر نشده', noReleasesBody: 'به محض همگام‌سازی بعد از اولین انتشار پایدار در گیت‌هاب، فایل‌ها اینجا نمایش داده می‌شوند.',
    releaseOnGithub: 'مشاهده در گیت‌هاب', notes: 'یادداشت تغییرات', noAssets: 'برای این انتشار فایل دانلودی جداگانه‌ای ثبت نشده است.', stable: 'پایدار', about: 'پشت این پروژه‌ها',
    aboutBio: 'من متین رمضانی‌ام. اینجا اپلیکیشن‌های اندروید، پروژه‌های وب و ابزارهای پایتونم را معرفی می‌کنم.', toolsLabel: 'زبان‌ها و ابزارها',
    profile: 'پروفایل گیت‌هاب', top: 'بازگشت به بالا', themeLight: 'فعال کردن حالت روشن', themeDark: 'فعال کردن حالت تیره', language: 'Switch to English',
    publishedStudy: 'معرفی عمومی', updated: 'به‌روزرسانی داده‌ها', downloadWord: 'دانلود', projectOne: 'پروژه', projectMany: 'پروژه‌ها',
  },
  en: {
    navProjects: 'Projects', navReleases: 'Releases', navAbout: 'About', skip: 'Skip to content',
    badge: 'Developer portfolio', heroA: 'Matin', heroB: 'Ramezani', intro: 'I’m Matin. This is an index of the apps, websites, and tools I build, with demos and downloads where available.',
    consoleLabel: 'Site command prompt', consoleDirectory: 'Site directories', consoleInput: 'Navigation command', consoleSubmit: 'Run command', consoleUnknown: 'Unknown command. Type help for options.', linksLabel: 'Links', techFilter: 'Technology',
    explore: 'Explore projects', downloads: 'Download center', featured: 'Featured', projectsLabel: 'Selected work',
    projectIntro: 'A collection of apps, tools, and experiments I’ve built.', search: 'Search projects…', all: 'All', mobile: 'Mobile', tools: 'Tools', testing: 'Testing', ui: 'UI', web: 'Web',
    source: 'Source code', demo: 'Demo', caseStudy: 'Case study', github: 'GitHub', noProjects: 'No projects match your search.', countLabel: 'projects',
    releasesLabel: 'Stable releases', releaseIntro: 'Stable builds, LTS versions, release notes, and downloadable files in one place.',
    syncBadge: 'Synced with GitHub', noReleases: 'No stable releases yet', noReleasesBody: 'The first stable GitHub release will appear here after the next sync.',
    releaseOnGithub: 'View on GitHub', notes: 'Release notes', noAssets: 'No separate download files were attached to this release.', stable: 'Stable', about: 'Behind the projects',
    aboutBio: 'I’m Matin Ramezani. This portfolio brings together my Android apps, web projects, and Python tools.', toolsLabel: 'Languages & tools',
    profile: 'GitHub profile', top: 'Back to top', themeLight: 'Use light theme', themeDark: 'Use dark theme', language: 'تغییر زبان به فارسی',
    publishedStudy: 'Public case study', updated: 'Data synced', downloadWord: 'downloads', projectOne: 'project', projectMany: 'projects',
  },
};

export type Language = keyof typeof copy;
