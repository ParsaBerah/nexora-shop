import React from 'react';

const categories = [
  { id: 1, title: 'گوشی', image: 'assets//category-phone.webp' },
  { id: 2, title: 'لپ‌تاپ', image: 'assets//category-laptop.webp' },
  { id: 3, title: 'هندزفری', image: 'assets//category-headphone.webp' },
  { id: 4, title: 'کنسول بازی', image: 'assets//category-console.webp' },
  { id: 5, title: 'اداری', image: 'assets//category-office.webp' },
  { id: 6, title: 'ساعت هوشمند', image: 'assets//category-watch.webp' },
  { id: 7, title: 'کیبورد', image: 'assets//category-keyboard.webp' },
  { id: 8, title: 'پاوربانک', image: 'assets//category-powerbank.webp' },
  { id: 9, title: 'موس', image: 'assets//category-mouse.webp' },
  { id: 10, title: 'دوربین', image: 'assets//category-camera.webp' },
  { id: 11, title: 'کاور گوشی', image: 'assets//category-case.webp' },
];

export default function CategoryGrid() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-10 sm:py-14">
      <div className="max-w-[1380px] mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0b0b0b] mb-10 sm:mb-12">
          هرچیزی که نیاز داری
        </h2>

        <div className="flex flex-wrap items-start justify-center gap-7 sm:gap-9">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className="group flex flex-col items-center w-[120px] sm:w-[150px] transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] flex items-center justify-center mb-3">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#0b0b0b] group-hover:text-blue-600 transition-colors duration-200">
                {cat.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}