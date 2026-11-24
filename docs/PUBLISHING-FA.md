# انتشار خروجی پروژه‌ها در Protofito

فایل‌های **Songs Cleaner** و **Ananas VPN** را در [Releases مخزن portfolio](https://github.com/Matin-RK0/portfolio/releases) منتشر کنید.

| پروژه | نمونهٔ تگ | خروجی |
| --- | --- | --- |
| Songs Cleaner | `songs-cleaner-v1.0.0` | فایل‌های نسخه، از جمله APK امضاشده برای اندروید |
| Ananas VPN | `ananas-v1.0.0` | APK امضاشده |

1. **Draft a new release** را بزنید و تگ را با پیشوند پروژه بسازید.
2. عنوان و توضیحات عمومی نسخه را بنویسید و فایل‌ها را به Release پیوست کنید.
3. گزینهٔ **This is a pre-release** را برای نسخهٔ پایدار خاموش بگذارید و **Publish release** را بزنید.
4. پس از همگام‌سازی، نسخه در مرکز دانلود نمایش داده می‌شود. برای به‌روزرسانی فوری، در [Actions پورتفولیو](https://github.com/Matin-RK0/portfolio/actions/workflows/deploy.yml) گزینهٔ **Run workflow** را بزنید و `main` را انتخاب کنید.
5. برای نسخهٔ بعدی از همان پیشوند و یک شمارهٔ نسخهٔ جدید استفاده کنید. سایت فقط نسخهٔ پایدار هر پروژه را انتخاب می‌کند و به تگ یا عنوان LTS اولویت می‌دهد.

فقط خروجی تأییدشده و متن عمومی را در Release بگذارید. کد مخزن خصوصی، کلید امضا و تنظیمات داخلی لازم نیست. برای دانلود مستقیم روی اندروید، APK را اضافه کنید؛ AAB به‌تنهایی جای APK نیست.

کارت **حکم: میراث** به بازار، مایکت و نسخهٔ وب پیوند دارد. **تتا** پیوند وب‌سایت و **ConfigCollector** دو پیوند اشتراک دارد. این سه پروژه برای نمایش لینک‌ها به Release نیاز ندارند.

[راهنمای رسمی GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
