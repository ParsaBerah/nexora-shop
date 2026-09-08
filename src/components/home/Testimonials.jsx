import React, { useState, useEffect } from 'react';

const testimonialsData = [
  // اسلاید اول
  [
    {
      id: 1,
      name: 'سارا احمدی',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user1.webp',
      rating: 4,
      text: 'بسته‌بندی عالی، ارسال سریع و محصول کاملاً اصل بود. چیزی که بیشتر از همه دوست داشتم، پشتیبانی خوب قبل از خرید بود.',
    },
    {
      id: 2,
      name: 'پارسا برهمن',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user2.webp',
      rating: 4,
      text: 'قبل از خرید بین چند مدل مردد بودم، ولی راهنمای خرید نکسورا کمک کرد انتخاب خیلی بهتری داشته باشم. کاملاً راضی‌ام.',
    },
    {
      id: 3,
      name: 'محمد رضایی',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user3.webp',
      rating: 4,
      text: 'تجربه خرید از نکسورا واقعاً عالی بود. محصول دقیقاً مطابق توضیحات بود و سفارش خیلی سریع به دستم رسید.',
    },
  ],
  // اسلاید دوم
  [
    {
      id: 4,
      name: 'مهسا کریمی',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user4.webp',
      rating: 5,
      text: 'تنوع هدفون‌ها و هندزفری‌های بی‌سیم فوق‌العاده‌ست. گارانتی و اصالت کالا خیال خریدار رو کاملاً راحت می‌کنه.',
    },
    {
      id: 5,
      name: 'علی ناصری',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user5.webp',
      rating: 4,
      text: 'لپ‌تاپی که گرفتم بسته‌بندی پلمپ و بی‌نقصی داشت. تست سلامت درایوها هم کاملاً بدون مشکل بود، ممنون از نکسورا.',
    },
    {
      id: 6,
      name: 'نیلوفر صادقی',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user6.webp',
      rating: 5,
      text: 'امکان پرداخت امن و شفاف بودن مراحل ارسال باعث شد بار دوم هم خریدم رو با اطمینان از این فروشگاه انجام بدم.',
    },
  ],
  // اسلاید سوم
  [
    {
      id: 7,
      name: 'امیرحسین تهرانی',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user7.webp',
      rating: 4,
      text: 'پاوربانک فست‌شارژ خریدم و تست سلامت باتری عالی بود. تحویل زیر ۴۸ ساعت در شهرستان واقعاً ارزش خرید رو بالا برد.',
    },
    {
      id: 8,
      name: 'ریحانه فرهمند',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user8.webp',
      rating: 5,
      text: 'کیفیت قطعات و قیمت‌گذاری منصفانه‌تر از بازار سنتی است. تخفیف‌های ویژه هم به شدت ارزش بررسی دارند.',
    },
    {
      id: 9,
      name: 'سینا راد',
      role: 'خریدار تأییدشده',
      avatar: '/assets/user9.webp',
      rating: 4,
      text: 'تجربه پاسخگویی بسیار محترمانه پشتیبانی تلفنی به سوالات من باعث شد نکسورا رو به همه همکارانم پیشنهاد کنم.',
    },
  ],
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-12 sm:py-16">
      <div 
        className="max-w-[1380px] mx-auto text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <h2 className="text-xl sm:text-2xl font-black text-[#0b0b0b] mb-10">
          کاربران درباره NEXORA می‌گویند
        </h2>

        {/* کانتینر اسلایدها */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(${currentSlide * 100}%)` }}
          >
            {testimonialsData.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1"
              >
                {group.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-[26px] p-7 flex flex-col justify-between text-right shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[250px]"
                  >
                    {/* ستاره‌ها */}
                    <div className="flex items-center gap-1 mb-4 text-lg">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < item.rating ? 'text-amber-400' : 'text-gray-200'}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-semibold mb-6">
                      {item.text}
                    </p>

                    <div className="flex items-center justify-end gap-3 mt-auto">
                      <div className="flex flex-col text-right">
                        <span className="text-xs sm:text-sm font-extrabold text-black">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-bold">
                          {item.role}
                        </span>
                      </div>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-100"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* دکمه‌های ناوبری نقطه‌ای */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-black scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`رفتن به اسلاید ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}