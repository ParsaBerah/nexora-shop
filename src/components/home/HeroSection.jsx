import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-6 sm:py-8">
      <div className="max-w-[1380px] mx-auto">
        <div 
          className="w-full min-h-[460px] md:min-h-[520px] rounded-[28px] sm:rounded-[36px] bg-[#f2f3f5] bg-cover bg-center md:bg-[left_center] bg-no-repeat flex items-center p-6 sm:p-14 lg:p-18 relative overflow-hidden"
          style={{ backgroundImage: "url('assets//hero-banner.webp')" }}
        >
          {/* لایه محافظ نیمه‌شفاف برای خوانایی متن در موبایل */}
          <div className="absolute inset-0 bg-white/80 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none -z-0 pointer-events-none" />

          <div className="max-w-[500px] flex flex-col items-start gap-4 sm:gap-5 z-10 mx-auto md:mx-0 text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0b0b0b] leading-[1.25] tracking-tight">
              تکنولوژی برای<br />زندگی بهتر
            </h1>
            
            <p className="text-xs sm:text-base text-gray-700 leading-relaxed font-semibold max-w-[440px]">
              جدیدترین گجت‌ها و اکسسوری‌های دیجیتال را با انتخابی هوشمندانه، کیفیتی مطمئن و تجربه‌ای ساده تهیه کن
            </p>

            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-extrabold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shadow-black/10 active:scale-95 group mt-2"
            >
              <span>مشاهده محصولات</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}