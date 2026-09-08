import React, { useState } from 'react';
import { 
  Heart, Share2, Star, Check, ShoppingBag, 
  ShieldCheck, Truck, RotateCcw, Lock, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const productData = {
  id: 'tuf-f15-fx506jmr',
  code: 'LAP-AS-014',
  title: 'لپ تاپ ۱۵.۶ اینچی ایسوس مدل TUF Gaming F15 FX506JMR',
  rating: 4.8,
  reviewCount: 24,
  inStock: true,
  summarySpecs: [
    'پردازنده: Intel Core i7-11800H / ۱۶ مگابایت حافظه کَش',
    'کارت گرافیک: NVIDIA RTX 3060 6GB GDDR6 / صفحه نمایش ۱۵.۶ اینچی ۱۴۴Hz',
  ],
  price: 64490000,
  originalPrice: 67900000,
  discountPercent: 5,
  images: [
    'assets/tuf-laptop-1.webp',
    'assets/tuf-laptop-1.webp',
    'assets/tuf-laptop-1.webp',
  ],
  description:
    'لپ‌تاپ ایسوس TUF Gaming F15 FX506JMR یک انتخاب قدرتمند برای گیمرها و کاربران حرفه‌ای است. این لپ‌تاپ با بهره‌گیری از پردازنده نسل یازدهم Intel Core i7 و کارت گرافیک RTX 3060 عملکرد عالی در اجرای بازی‌های روز و نرم‌افزارهای سنگین ارائه می‌دهد. صفحه نمایش ۱۵.۶ اینچی FHD با نرخ نوسازی ۱۴۴Hz تجربه‌ای روان و لذت‌بخش را تضمین می‌کند.',
  specs: [
    { label: 'مقدار', value: 'مشخصات' },
    { label: 'پردازنده', value: 'Intel Core i7-11800H' },
    { label: 'کارت گرافیک', value: 'NVIDIA GeForce RTX 3060 6GB' },
    { label: 'حافظه رم', value: '16GB DDR4' },
    { label: 'حافظه داخلی', value: '512GB SSD NVMe' },
    { label: 'صفحه نمایش', value: '15.6" / FHD / 144Hz / IPS-Level' },
    { label: 'سیستم عامل', value: 'بدون سیستم عامل' },
    { label: 'وزن', value: '۲.۳ کیلوگرم' },
    { label: 'رنگ', value: 'مشکی / خاکستری' },
  ],
  reviews: [
    {
      id: 1,
      author: 'پارسا برهمن',
      date: '۱۴۰۵/۰۵/۱۶',
      rating: 5,
      comment: 'طراحی و کیفیت ساخت عالی عملکرد فوق‌العاده‌ای در بازی‌ها داره. سیستم خنک‌کننده دو فن هم داره کاملاً راضی‌ام.',
      likes: 12,
      dislikes: 2,
    },
    {
      id: 2,
      author: 'پارسا برهمن',
      date: '۱۴۰۵/۰۵/۱۰',
      rating: 5,
      comment: 'طراحی و کیفیت ساخت عالی عملکرد فوق‌العاده‌ای در بازی‌ها داره. سیستم خنک‌کننده دو فن هم داره کاملاً راضی‌ام.',
      likes: 8,
      dislikes: 0,
    },
    {
      id: 3,
      author: 'پارسا برهمن',
      date: '۱۴۰۵/۰۴/۲۸',
      rating: 5,
      comment: 'طراحی و کیفیت ساخت عالی عملکرد فوق‌العاده‌ای در بازی‌ها داره. سیستم خنک‌کننده دو فن هم داره کاملاً راضی‌ام.',
      likes: 15,
      dislikes: 1,
    },
  ],
  related: [
    { id: 'rel-1', title: 'کنسول بازی سونی مدل PlayStation 5 Slim ظرفیت ۱ ترابایت', price: 37490000, img: 'assets/ps5.webp' },
    { id: 'rel-2', title: 'لپ تاپ لنوو مدل LOQ 15IRX9 پردازنده i7 با رم 16GB', price: 61900000, img: 'assets/lenovo-loq.webp' },
    { id: 'rel-3', title: 'لپ تاپ ۱۵.۶ اینچی اچ پی مدل Victus 15-fa1093dx i5', price: 41290000, img: 'assets/hp-victus.webp' },
    { id: 'rel-4', title: 'لپ تاپ ۱۵ اینچی ایسوس مدل TUF Gaming F15 FX506HF', price: 54990000, img: 'assets/tuf-laptop-1.webp', badge: 'فروش ویژه' },
    { id: 'rel-5', title: 'لپ تاپ ۱۵.۶ اینچی اچ پی مدل Victus 15-fa0031dx i5', price: 44390000, img: 'assets/hp-victus.webp' },
  ],
};

export default function ProductDetail({ onBackToHome }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: productData.id,
      title: productData.title,
      price: productData.price,
      image: productData.images[0],
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20 " dir="rtl">
      
      {/* ۱. Breadcrumb با دکمه بازگشت به خانه */}
      <nav className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-6 pb-4 text-xs font-semibold text-zinc-400 flex items-center gap-2 overflow-x-auto select-none">
        <button 
          onClick={onBackToHome}
          className="hover:text-black transition whitespace-nowrap font-bold text-zinc-700"
        >
          فروشگاه نکسورا
        </button>
        <span>/</span>
        <button 
          onClick={onBackToHome}
          className="hover:text-black transition whitespace-nowrap"
        >
          گجت‌ها و لوازم جانبی
        </button>
        <span>/</span>
        <span className="hover:text-black transition whitespace-nowrap">لپ‌تاپ</span>
        <span>/</span>
        <span className="text-zinc-700 truncate">{productData.title}</span>
      </nav>

      {/* ۲. بخش بالای صفحه: گالری + خلاصه اطلاعات خرید */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ستون راست: گالری عکس */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* تصویر بزرگ */}
            <div className="relative w-full aspect-square max-w-[460px] bg-white border border-zinc-100 rounded-3xl p-6 flex items-center justify-center shadow-sm">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)} 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isLiked ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-zinc-200 text-zinc-400 hover:text-black'
                  }`}
                  aria-label="علاقه‌مندی"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button 
                  className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black transition"
                  aria-label="اشتراک‌گذاری"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <img 
                src={productData.images[selectedImage]} 
                alt={productData.title}
                className="max-h-[320px] max-w-full object-contain transition-all duration-300"
              />
            </div>

            {/* تصاویر بندانگشتی (Thumbnails) */}
            <div className="flex items-center gap-3 mt-5">
              <button 
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : productData.images.length - 1))}
                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {productData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-2xl border p-1 bg-white transition-all overflow-hidden ${
                    selectedImage === index ? 'border-black ring-1 ring-black' : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <img src={img} alt={`نمای ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}

              <button 
                onClick={() => setSelectedImage((prev) => (prev < productData.images.length - 1 ? prev + 1 : 0))}
                className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ستون چپ: مشخصات، قیمت، و دکمه خرید */}
          <div className="lg:col-span-7 flex flex-col text-right">
            <span className="text-xs font-semibold text-zinc-400 mb-2">
              کد محصول: {productData.code}
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-black leading-snug tracking-tight mb-4">
              {productData.title}
            </h1>

            {/* امتیاز و موجودی */}
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-100">
              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-black">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="text-black font-extrabold text-sm">{productData.rating}</span>
                <span className="text-zinc-400 font-medium">({productData.reviewCount} نظر)</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                موجود در انبار نکسورا
              </span>
            </div>

            {/* ویژگی‌های کلیدی مختصر */}
            <div className="py-5 space-y-2 text-xs sm:text-sm font-semibold text-zinc-600 border-b border-zinc-100">
              {productData.summarySpecs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* قیمت و تخفیف */}
            <div className="py-6 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                {productData.price.toLocaleString('fa-IR')}
              </span>
              <span className="text-sm font-black text-zinc-800">تومان</span>

              {productData.originalPrice && (
                <>
                  <span className="text-sm font-semibold text-zinc-400 line-through mr-2">
                    {productData.originalPrice.toLocaleString('fa-IR')}
                  </span>
                  <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                    {productData.discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* دکمه‌های خرید */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full sm:flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
                  isAdded 
                    ? 'bg-emerald-600 text-white shadow-emerald-200' 
                    : 'bg-black hover:bg-zinc-800 text-white shadow-black/10 active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3] animate-in zoom-in" />
                    <span>به سبد خرید اضافه شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 stroke-[2]" />
                    <span>افزودن به سبد خرید</span>
                  </>
                )}
              </button>

              <button className="w-full sm:w-44 py-4 rounded-2xl font-extrabold text-sm border border-zinc-300 text-zinc-800 hover:bg-zinc-50 active:scale-98 transition">
                خرید فوری
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ۳. نوارهای نشان اعتماد */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-dashed border-zinc-200">
          <div className="flex items-center gap-3 justify-center">
            <ShieldCheck className="w-6 h-6 text-zinc-700" />
            <div className="text-right">
              <h4 className="text-xs font-black">ضمانت کالا</h4>
              <p className="text-[11px] text-zinc-400">تضمین خرید مطمئن</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Truck className="w-6 h-6 text-zinc-700" />
            <div className="text-right">
              <h4 className="text-xs font-black">ارسال سریع</h4>
              <p className="text-[11px] text-zinc-400">۲۴ تا ۴۸ ساعت</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <RotateCcw className="w-6 h-6 text-zinc-700" />
            <div className="text-right">
              <h4 className="text-xs font-black">بازگشت آسان</h4>
              <p className="text-[11px] text-zinc-400">تا ۷ روز پس از خرید</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Lock className="w-6 h-6 text-zinc-700" />
            <div className="text-right">
              <h4 className="text-xs font-black">پرداخت امن</h4>
              <p className="text-[11px] text-zinc-400">با درگاه‌های شاپرک</p>
            </div>
          </div>
        </div>
      </div>

      {/* ۴. تب‌ها: توضیحات / مشخصات فنی / نظرات */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-4">
        <div className="flex items-center gap-8 border-b border-zinc-200 pb-3 mb-8">
          <button 
            onClick={() => setActiveTab('desc')}
            className={`text-sm font-black pb-2.5 -mb-3 transition-colors ${
              activeTab === 'desc' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
            }`}
          >
            توضیحات محصول
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`text-sm font-black pb-2.5 -mb-3 transition-colors ${
              activeTab === 'specs' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
            }`}
          >
            مشخصات فنی
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-black pb-2.5 -mb-3 transition-colors ${
              activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'
            }`}
          >
            نظرات کاربران ({productData.reviewCount})
          </button>
        </div>

        {/* توضیحات متن محصول */}
        <div className="text-xs sm:text-sm font-medium text-zinc-600 leading-loose text-justify mb-12">
          {productData.description}
        </div>

        {/* جدول مشخصات فنی اختصاصی طراحی */}
        <div className="mb-16">
          <h3 className="text-base font-black text-black mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            مشخصات فنی
          </h3>
          <div className="max-w-2xl divide-y divide-zinc-100 text-xs sm:text-sm font-semibold">
            {productData.specs.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 py-3">
                <span className="col-span-4 text-zinc-400">{item.label}</span>
                <span className="col-span-8 text-zinc-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ۵. بخش نظرات کاربران */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-black text-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              نظرات کاربران
            </h3>
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-black transition">
              مشاهده همه &gt;
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* امتیاز کلی ستون راست */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-black">۴.۸</span>
                <span className="text-sm text-zinc-400">از ۵</span>
              </div>
              <div className="flex text-amber-400 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium mb-6">براساس ۲۴ نظر</span>

              {/* Progress bars */}
              <div className="w-full space-y-2 text-xs font-bold text-zinc-400">
                <div className="flex items-center gap-2">
                  <span>۵</span>
                  <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-zinc-800 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>۴</span>
                  <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="w-[50%] h-full bg-zinc-800 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>۳</span>
                  <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="w-[15%] h-full bg-zinc-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* کارت‌های نظرات ستون چپ */}
            <div className="lg:col-span-8 space-y-4">
              {productData.reviews.map((rev) => (
                <div key={rev.id} className="p-5 border border-zinc-100 rounded-2xl bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
                        {rev.author[0]}
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-black">{rev.author}</h5>
                        <span className="text-[10px] text-zinc-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-zinc-600 leading-relaxed mb-4">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 pt-2 border-t border-zinc-50">
                    <button className="hover:text-black transition">پاسخ به این نظر &gt;</button>
                    <div className="flex items-center gap-4">
                      <span>👍 {rev.likes}</span>
                      <span>👎 {rev.dislikes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ۶. محصولات مرتبط */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-black text-black flex items-center gap-2">
              محصولات مرتبط
            </h3>
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-black transition">
              مشاهده همه &gt;
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {productData.related.map((item) => (
              <div 
                key={item.id} 
                className="group border border-zinc-100 rounded-3xl p-4 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="w-full aspect-square flex items-center justify-center p-2 mb-3">
                  <img src={item.img} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 line-clamp-2 leading-relaxed mb-4">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition"
                      aria-label="افزودن"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-left font-black text-xs">
                      <span>{item.price.toLocaleString('fa-IR')}</span>
                      <span className="text-[10px] text-zinc-400 mr-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}