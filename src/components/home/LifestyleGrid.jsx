import React from 'react';
import { ChevronLeft } from 'lucide-react';

const lifestyles = [
  {
    id: 1,
    title: 'مخصوص گیمینگ و استریم',
    image: 'assets//lifestyle-gamers.webp',
  },
  {
    id: 2,
    title: 'ست اداری و مینیمال دسکتاپ',
    image: 'assets//lifestyle-workspace.webp',
  },
  {
    id: 3,
    title: 'ورزش و فعالیت‌های روزمره',
    image: 'assets//lifestyle-smart-home.webp',
  },
];

export default function LifestyleGrid() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-8 sm:py-12">
      <div className="max-w-[1380px] mx-auto">
        <div className="flex items-center justify-between pb-6 border-b-[1.5px] border-dashed border-gray-200 mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0b0b0b]">
            بر اساس سبک زندگی شما
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-black transition-colors"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {lifestyles.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group relative block aspect-[4/3] rounded-[36px] overflow-hidden bg-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-6 sm:p-8">
                <span className="text-white text-base sm:text-lg font-black text-center group-hover:text-blue-300 transition-colors">
                  {item.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}