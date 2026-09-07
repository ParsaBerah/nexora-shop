import React from 'react';

const categories = [
  { id: 1, title: 'گوشی', image: 'src/assets/category-phone.png' },
  { id: 2, title: 'لپ‌تاپ', image: 'src/assets/category-laptop.png' },
  { id: 3, title: 'هندزفری', image: 'src/assets/category-headphone.png' },
  { id: 4, title: 'کنسول بازی', image: 'src/assets/category-console.png' },
  { id: 5, title: 'اداری', image: 'src/assets/category-office.png' },
  { id: 6, title: 'ساعت هوشمند', image: 'src/assets/category-watch.png' },
  { id: 7, title: 'کیبورد', image: 'src/assets/category-keyboard.png' },
  { id: 8, title: 'پاوربانک', image: 'src/assets/category-powerbank.png' },
  { id: 9, title: 'موس', image: 'src/assets/category-mouse.png' },
  { id: 10, title: 'دوربین', image: 'src/assets/category-camera.png' },
  { id: 11, title: 'کاور گوشی', image: 'src/assets/category-case.png' },
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