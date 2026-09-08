import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, 
  ShoppingBag, ShieldCheck, Truck, RotateCcw, Lock 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const initialProducts = [
  {
    id: 'p-1',
    title: 'لپ تاپ ۱۶ اینچی ایسوس مدل TUF Gaming F16 FX608JMR',
    brand: 'asus',
    price: 324900000,
    oldPrice: 342000000,
    discount: 5,
    image: 'assets/product-tuf.png',
    hasFreeShipping: true,
    salesCount: 140,
  },
  {
    id: 'p-2',
    title: 'لپ تاپ ۱۵.۶ اینچی اچ پی مدل Victus 15 fa2082wm-i5',
    brand: 'hp',
    price: 167300000,
    oldPrice: 169000000,
    discount: 1,
    image: 'assets/product-victus.png',
    hasFreeShipping: false,
    salesCount: 85,
  },
  {
    id: 'p-3',
    title: 'لپ تاپ لنوو مدل LOQ 15IRX9 با پردازنده Core i7',
    brand: 'lenovo',
    price: 216900000,
    oldPrice: null,
    discount: null,
    image: 'assets/product-loq.png',
    hasFreeShipping: true,
    salesCount: 210,
  },
  {
    id: 'p-4',
    title: 'لپ تاپ ایسوس مدل Vivobook Go 15 E1504GA',
    brand: 'asus',
    price: 21500000,
    oldPrice: null,
    discount: null,
    image: 'assets/product-tuf.png',
    hasFreeShipping: false,
    salesCount: 65,
  },
  {
    id: 'p-5',
    title: 'لپ تاپ ۱۶ اینچی ایسوس مدل ROG Strix G16 G614JV',
    brand: 'asus',
    price: 384000000,
    oldPrice: 395000000,
    discount: 3,
    image: 'assets/product-tuf.png',
    hasFreeShipping: true,
    salesCount: 95,
  },
  {
    id: 'p-6',
    title: 'لپ تاپ ۱۵.۶ اینچی اچ پی مدل Victus Gaming 15',
    brand: 'hp',
    price: 187300000,
    oldPrice: null,
    discount: null,
    image: 'assets/product-victus2.png',
    hasFreeShipping: true,
    salesCount: 120,
  },
  {
    id: 'p-7',
    title: 'لپ تاپ گیمینگ لنوو مدل Legion Pro 5 i7 14700HX',
    brand: 'lenovo',
    price: 329900000,
    oldPrice: 345000000,
    discount: 4,
    image: 'assets/product-loq.png',
    hasFreeShipping: true,
    salesCount: 180,
  },
  {
    id: 'p-8',
    title: 'لپ تاپ ایسوس مدل Vivobook 15 OLED K513EQ',
    brand: 'asus',
    price: 41500000,
    oldPrice: null,
    discount: null,
    image: 'assets/product-tuf.png',
    hasFreeShipping: false,
    salesCount: 40,
  },
];

export default function ShopPage({ onProductSelect, onBackToHome }) {
  const { addToCart } = useCart();
  const [selectedSort, setSelectedSort] = useState('default');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');

  // آکاردئون‌های باز شده سایدبار
  const [openSections, setOpenSections] = useState({
    manufacturer: true,
    price: false,
    brand: false,
    colors: false,
    category: false,
    ram: false,
    display: false,
    ssd: false,
    hdd: false,
    cpu: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // فیلتر و مرتب‌سازی داده‌ها
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((item) => {
        if (onlyDiscounted && !item.discount) return false;
        if (onlyFreeShipping && !item.hasFreeShipping) return false;
        if (selectedBrand !== 'all' && item.brand !== selectedBrand) return false;
        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'cheapest') return a.price - b.price;
        if (selectedSort === 'expensive') return b.price - a.price;
        if (selectedSort === 'popular') return b.salesCount - a.salesCount;
        return 0;
      });
  }, [selectedSort, onlyDiscounted, onlyFreeShipping, selectedBrand]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20" dir="rtl">
      
      {/* Breadcrumb */}
      <nav className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-6 pb-2 text-xs font-semibold text-zinc-400 flex items-center gap-2 select-none">
        <button onClick={onBackToHome} className="hover:text-black transition">فروشگاه نکسورا</button>
        <span>/</span>
        <button onClick={onBackToHome} className="hover:text-black transition">لپ‌تاپ و لوازم جانبی</button>
        <span>/</span>
        <span className="text-zinc-700 font-bold">لپ‌تاپ</span>
      </nav>

      {/* عنوان دسته‌بندی */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-2 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-black">لپ‌تاپ</h1>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ستون راست: سایدبار فیلترها (عرض ۴ از ۱۲ در دسکتاپ) */}
          <aside className="lg:col-span-3 order-2 lg:order-1 space-y-4">
            <div className="border border-zinc-200/80 rounded-3xl p-5 bg-white divide-y divide-zinc-100">
              
              {/* تولیدکننده */}
              <div className="py-3.5 first:pt-0">
                <button
                  onClick={() => toggleSection('manufacturer')}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-800"
                >
                  <span>تولید کننده</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openSections.manufacturer ? 'rotate-180' : ''}`} />
                </button>
                {openSections.manufacturer && (
                  <div className="pt-3 space-y-2 text-xs font-medium text-zinc-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="brand" 
                        checked={selectedBrand === 'all'} 
                        onChange={() => setSelectedBrand('all')} 
                        className="accent-black" 
                      />
                      <span>همه برندها</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="brand" 
                        checked={selectedBrand === 'asus'} 
                        onChange={() => setSelectedBrand('asus')} 
                        className="accent-black" 
                      />
                      <span>ایسوس (ASUS)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="brand" 
                        checked={selectedBrand === 'lenovo'} 
                        onChange={() => setSelectedBrand('lenovo')} 
                        className="accent-black" 
                      />
                      <span>لنوو (Lenovo)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="brand" 
                        checked={selectedBrand === 'hp'} 
                        onChange={() => setSelectedBrand('hp')} 
                        className="accent-black" 
                      />
                      <span>اچ‌پی (HP)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* محدوده قیمت */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleSection('price')}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-800"
                >
                  <span>محدوده قیمت</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
                </button>
                {openSections.price && (
                  <div className="pt-3 text-xs text-zinc-400 font-medium">
                    فیلتر بر اساس اسلایدر قیمت
                  </div>
                )}
              </div>

              {/* سوئیچ ارسال رایگان */}
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-800">ارسال رایگان</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyFreeShipping}
                    onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              {/* دسته‌بندی */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleSection('category')}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-800"
                >
                  <span>دسته‌بندی</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openSections.category ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* سوئیچ تخفیف */}
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-800">تخفیف‌دارها</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={(e) => setOnlyDiscounted(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              {/* فیلترهای تکمیلی سخت‌افزاری */}
              {['RAM', 'مانیتور', 'حافظه SSD', 'حافظه HDD', 'سری پردازنده'].map((filterTitle, index) => (
                <div key={index} className="py-3.5">
                  <button className="w-full flex items-center justify-between text-xs font-bold text-zinc-800">
                    <span>{filterTitle}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              ))}

              {/* دکمه اعمال فیلتر */}
              <div className="pt-4">
                <button 
                  onClick={() => {}}
                  className="w-full py-3 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black transition active:scale-98 shadow-md"
                >
                  اعمال فیلتر
                </button>
              </div>

            </div>
          </aside>

          {/* ستون چپ: ردیف مرتب‌سازی + گرید محصولات (عرض ۹ از ۱۲ در دسکتاپ) */}
          <main className="lg:col-span-9 order-1 lg:order-2">
            
            {/* نوار مرتب‌سازی */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 mb-6 border-b border-zinc-100 text-xs font-bold">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto select-none">
                <span className="inline-flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
                  <SlidersHorizontal className="w-4 h-4" />
                  مرتب‌سازی بر اساس:
                </span>
                
                <button
                  onClick={() => setSelectedSort('default')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedSort === 'default' ? 'bg-zinc-100 text-black font-black' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  پیش‌فرض
                </button>
                <button
                  onClick={() => setSelectedSort('cheapest')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedSort === 'cheapest' ? 'bg-zinc-100 text-black font-black' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  ارزان‌ترین
                </button>
                <button
                  onClick={() => setSelectedSort('expensive')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedSort === 'expensive' ? 'bg-zinc-100 text-black font-black' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  گران‌ترین
                </button>
                <button
                  onClick={() => setSelectedSort('popular')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedSort === 'popular' ? 'bg-zinc-100 text-black font-black' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  پرفروش‌ترین
                </button>
              </div>

              <span className="text-zinc-400 font-medium">
                {filteredProducts.length} کالا
              </span>
            </div>

            {/* گرید محصولات (۴ ستون در لارج، ۲ ستون در موبایل) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={onProductSelect}
                  className="cursor-pointer group bg-white border border-zinc-200/80 rounded-3xl p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* تصویر محصول */}
                  <div className="w-full aspect-square flex items-center justify-center p-2 mb-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* عنوان محصول */}
                  <h3 className="text-xs font-bold text-zinc-900 line-clamp-2 leading-relaxed h-10 mb-3 text-right">
                    {product.title}
                  </h3>

                  {/* قیمت و دکمه افزودن */}
                  <div className="flex items-end justify-between pt-2 border-t border-zinc-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-8 h-8 rounded-xl bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition active:scale-95 shadow-sm"
                      aria-label="افزودن به سبد"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex flex-col items-end gap-1">
                      {product.oldPrice && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-zinc-400 line-through">
                            {product.oldPrice.toLocaleString('fa-IR')}
                          </span>
                          <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                            {product.discount}٪
                          </span>
                        </div>
                      )}
                      <span className="text-xs sm:text-sm font-black text-black">
                        {product.price.toLocaleString('fa-IR')}{' '}
                        <span className="text-[10px] font-bold text-zinc-500">تومان</span>
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* صفحه‌بندی (Pagination) */}
            <div className="flex items-center justify-center gap-2 pt-12 select-none">
              <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 text-zinc-600">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
                ۱
              </button>
              <button className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-zinc-50">
                ۲
              </button>
              <button className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-zinc-50">
                ۳
              </button>
              <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 text-zinc-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </main>

        </div>
      </div>

      {/* نشان‌های اعتماد انتهای صفحه */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 mt-20">
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

    </div>
  );
}