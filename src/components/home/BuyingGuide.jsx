import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function BuyingGuide() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-8 sm:py-12">
      <div className="max-w-[1380px] mx-auto">
        
        {/* هدر بخش راهنمای خرید */}
        <div className="flex items-center justify-between pb-6 border-b-[1.5px] border-dashed border-gray-200 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#0b0b0b]">
            راهنمای خرید
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-black transition-colors"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-4 h-4" />
          </a>
        </div>

        {/* شبکه دو کارتی با قاب سفید و گوشه‌های کاملاً گرد */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          
          {/* کارت ۱: هدفون */}
          <a
            href="#"
            className="group block bg-white rounded-[38px] sm:rounded-[48px] p-4 sm:p-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="w-full rounded-[28px] sm:rounded-[36px] overflow-hidden">
              <img
                src="assets//guide-headphones.webp"
                alt="خرید بهترین هدفون برای موسیقی"
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </a>

          {/* کارت ۲: پاوربانک */}
          <a
            href="#"
            className="group block bg-white rounded-[38px] sm:rounded-[48px] p-4 sm:p-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="w-full rounded-[28px] sm:rounded-[36px] overflow-hidden">
              <img
                src="assets//guide-powerbank.webp"
                alt="خرید بهترین پاوربانک برای آیفون"
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}