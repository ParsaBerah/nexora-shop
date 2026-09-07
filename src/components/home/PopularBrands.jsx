import React from 'react';

const brands = [
  { id: 1, name: 'Apple', logo: 'assets//brand-apple.svg' },
  { id: 2, name: 'Sony', logo: 'assets//brand-amd.svg' },
  { id: 3, name: 'Samsung', logo: 'assets//brand-rog.svg' },
  { id: 4, name: 'Asus', logo: 'assets//brand-asus.svg' },
  { id: 5, name: 'Logitech', logo: 'assets//brand-intel.svg' },
  { id: 6, name: 'Anker', logo: 'assets//brand-xiaomi.svg' },
];

export default function PopularBrands() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-8 sm:py-10">
      <div className="max-w-[1380px] mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-black text-[#0b0b0b] mb-8">
          محبوب‌ترین برندها
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-md cursor-pointer group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-10 max-w-[90px] object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}