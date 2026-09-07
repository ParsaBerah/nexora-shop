import React, { useRef } from 'react';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 101,
    title: 'کنسول بازی سونی مدل PlayStation 5 Pro ظرفیت ۲ ترابایت',
    oldPrice: 257634700,
    price: 237300000,
    discount: '۸٪',
    image: 'assets//product-ps5.png',
  },
  {
    id: 102,
    title: 'لپ تاپ لنوو مدل LOQ 15IRX9 با پردازنده Core i7',
    price: 216900000,
    image: 'assets//product-loq.png',
  },
  {
    id: 103,
    title: 'لپ تاپ ۱۵.۶ اینچی اچ پی مدل Victus 15 fa2082wm-i5',
    oldPrice: 169000000,
    price: 167300000,
    discount: '۱٪',
    image: 'assets//product-victus.png',
  },
  {
    id: 104,
    title: 'لپ تاپ ۱۶ اینچی ایسوس مدل TUF Gaming F16 FX608JMR',
    oldPrice: 342000000,
    price: 324900000,
    discount: '۹٪',
    image: 'assets//product-tuf.png',
  },
  {
    id: 105,
    title: 'لپ تاپ ۱۵.۶ اینچی اچ پی مدل Victus 15 fa2082wm-i5 نسخه دوم',
    oldPrice: 169000000,
    price: 167300000,
    discount: '۱٪',
    image: 'assets//product-victus2.png',
  },
];

export default function ProductSlider() {
  const { addToCart } = useCart();
  const sliderRef = useRef(null);

  return (
    <section id="products" className="w-full px-4 sm:px-6 lg:px-9 py-8 sm:py-12">
      <div className="max-w-[1380px] mx-auto">
        
        {/* هدر سکشن */}
        <div className="flex items-center justify-between pb-6 border-b-[1.5px] border-dashed border-gray-200 mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0b0b0b]">
            پرفروش‌ترین
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-black transition-colors"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-4 h-4" />
          </a>
        </div>

        {/* اسلایدر افقی کارت‌ها */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-none select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[240px] sm:w-[260px] bg-white border border-gray-200/80 rounded-3xl p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* عکس محصول */}
              <div className="w-full h-44 flex items-center justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* عنوان محصول */}
              <h3 className="text-xs sm:text-[13.5px] font-bold text-gray-900 line-clamp-2 leading-relaxed h-11 mb-4 text-right">
                {item.title}
              </h3>

              {/* قیمت و دکمه افزودن به سبد خرید */}
              <div className="flex items-end justify-between pt-2">
                <button
                  onClick={() => addToCart(item)}
                  className="w-10 h-10 rounded-xl bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-black/10"
                  aria-label="افزودن به سبد خرید"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                </button>

                <div className="flex flex-col items-end gap-1">
                  {item.oldPrice && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-gray-400 line-through">
                        {item.oldPrice.toLocaleString('fa-IR')}
                      </span>
                      <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                        {item.discount}
                      </span>
                    </div>
                  )}
                  <span className="text-sm sm:text-base font-black text-black">
                    {item.price.toLocaleString('fa-IR')}{' '}
                    <span className="text-[11px] font-bold text-gray-600">تومان</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}