import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ShowcaseBanners() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-8 sm:py-12">
      <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* بنر اول */}
        <div 
          className="relative rounded-[36px] overflow-hidden min-h-[260px] sm:min-h-[300px] p-8 sm:p-10 flex flex-col justify-between bg-[#0e1726] bg-cover bg-center group transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-black/10"
          style={{ backgroundImage: "url('assets//lifestyle-gamers.webp')" }}
        >
          <div className="max-w-[280px] z-10">
            <span className="text-xs font-black tracking-wider text-rose-500 uppercase mb-2 block">
              پیشنهاد ویژه
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              اکسسوری‌های هوشمند گیمینگ
            </h3>
          </div>

          <div className="z-10 mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-white group-hover:text-rose-400 transition-colors"
            >
              <span>خرید آنلاین</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </a>
          </div>
        </div>

        {/* بنر دوم */}
        <div 
          className="relative rounded-[36px] overflow-hidden min-h-[260px] sm:min-h-[300px] p-8 sm:p-10 flex flex-col justify-between bg-[#1f2937] bg-cover bg-center group transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-black/10"
          style={{ backgroundImage: "url('assets//lifestyle-workspace.webp')" }}
        >
          <div className="max-w-[280px] z-10">
            <span className="text-xs font-black tracking-wider text-blue-400 uppercase mb-2 block">
              تکنولوژی روز
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              جدیدترین هدفون‌های بی‌سیم
            </h3>
          </div>

          <div className="z-10 mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-white group-hover:text-blue-300 transition-colors"
            >
              <span>مشاهده دسته‌بندی</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}