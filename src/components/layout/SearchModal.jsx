import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronLeft, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, products = [], onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // فوکوس خودکار روی اینپوت بعد از باز شدن
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // بستن با کلید Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // فیلتر کردن محصولات بر اساس عبارت تایپ‌شده
  const filtered = searchTerm.trim() === '' 
    ? [] 
    : products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleProductClick = (product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4" dir="rtl">
      {/* بک‌دراپ تاریک */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* باکس جستجو */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-zinc-100">
        
        {/* نوار اینپوت */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 flex-shrink-0 stroke-[2.2]" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی نام کالا، برند یا مشخصات (مثلاً: ایسوس، PS5)..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-zinc-400 hover:text-black transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-zinc-500 hover:text-black px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
          >
            بستن
          </button>
        </div>

        {/* محتوای نتایج */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center">
              <span className="text-xs font-bold text-zinc-400">عبارت مورد نظر خود را برای جستجو وارد کنید.</span>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="text-[11px] text-zinc-400 font-semibold">بیشترین جستجوها:</span>
                {['لپ تاپ TUF', 'پلی استیشن ۵', 'Lenovo LOQ', 'اچ پی Victus'].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchTerm(tag)}
                    className="text-xs font-bold px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-full transition cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-black text-zinc-800 mb-1">کالایی با این مشخصات پیدا نشد</p>
              <span className="text-xs text-zinc-400">املای کلمات را بررسی کنید یا عبارت دیگری بنویسید.</span>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              <div className="text-[11px] font-bold text-zinc-400 pb-2">
                نتایج یافت‌شده ({filtered.length} مورد):
              </div>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-zinc-50 px-2 rounded-2xl transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded-xl border border-zinc-100 p-1 bg-white flex-shrink-0"
                    />
                    <div className="text-right truncate">
                      <h4 className="text-xs font-bold text-zinc-900 group-hover:text-blue-600 transition truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        کد: {item.code || 'PRD-NX'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-black text-black">
                      {item.price.toLocaleString('fa-IR')} <span className="text-[10px] text-zinc-500">تومان</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-zinc-300 group-hover:text-black transition" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}