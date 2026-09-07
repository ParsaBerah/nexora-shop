import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070708] text-white pt-16 pb-10 px-6 sm:px-10 lg:px-14 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
        
        {/* ۱. لوگوی بزرگ عمودی در سمت چپ دسکتاپ */}
        <aside className="flex items-center justify-center lg:justify-start select-none">
          <span className="font-black text-5xl lg:text-8xl tracking-[12px] lg:tracking-[16px] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:1.5px_#fff] transition-all duration-300 lg:[writing-mode:vertical-rl] lg:rotate-180">
            NEXORA
          </span>
        </aside>

        {/* ۲. محتوای اصلی فوتر */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* ردیف بالا */}
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-10 pb-12">
            
            {/* ستون‌های لینک */}
            <div className="w-full lg:w-auto grid grid-cols-3 gap-6 sm:gap-12 text-right">
              <div>
                <h4 className="text-base font-extrabold text-white mb-5">درباره ما</h4>
                <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-400">
                  <li><a href="#" className="hover:text-white transition">درباره ما</a></li>
                  <li><a href="#" className="hover:text-white transition">مجله نکسورا</a></li>
                  <li><a href="#" className="hover:text-white transition">راهنمای خرید</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white mb-5">پشتیبانی</h4>
                <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-400">
                  <li><a href="#" className="hover:text-white transition">تماس با ما</a></li>
                  <li><a href="#" className="hover:text-white transition">سوالات متداول</a></li>
                  <li><a href="#" className="hover:text-white transition">شرایط و قوانین</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white mb-5">فروشگاه</h4>
                <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-400">
                  <li><a href="#" className="hover:text-white transition">همه محصولات</a></li>
                  <li><a href="#" className="hover:text-white transition">تخفیف‌های ویژه</a></li>
                  <li><a href="#" className="hover:text-white transition">برندهای همکار</a></li>
                </ul>
              </div>
            </div>

            {/* شعار، خبرنامه و شبکه‌های اجتماعی */}
            <div className="flex flex-col items-center lg:items-start max-w-sm text-center lg:text-right">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-100 mb-2">
                تکنولوژی برای زندگی بهتر
              </h3>
              <p className="text-xs text-zinc-400 font-medium mb-5">
                با عضویت در خبرنامه از جدیدترین تخفیف‌ها باخبر شوید.
              </p>

              <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 mb-6 focus-within:border-zinc-600 transition"
              >
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید..."
                  className="flex-1 bg-transparent px-3 text-xs text-white outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-black text-xs font-black px-5 py-2.5 rounded-xl transition"
                >
                  ثبت
                </button>
              </form>

              <div className="flex items-center gap-3">
                {/* اینستاگرام */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:-translate-y-1 transition-all"
                  aria-label="اینستاگرام"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* تلفن / تماس */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:-translate-y-1 transition-all"
                  aria-label="تلفن"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>

                {/* یوتیوب */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:-translate-y-1 transition-all"
                  aria-label="یوتیوب"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* خط افقی جداکننده */}
          <div className="w-full border-t border-zinc-800/80 mb-6" />

          {/* ردیف پایین */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
            <div className="text-zinc-500 text-xs font-medium text-center sm:text-right" dir="ltr">
              <p>© 2026— Parsa Berahman</p>
              <p>All Rights Reserved</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex items-center justify-center">
                <img src="/assets/enamad.png" alt="اینماد" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex items-center justify-center">
                <img src="/assets/ecunion.png" alt="اتحادیه کسب و کارهای مجازی" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}