import React, { useState } from 'react';
import { Search, ShoppingBag, User, ChevronDown, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';
import MegaMenuDesktop from './MegaMenuDesktop';

export default function Header() {
  const { totalCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuHovered, setIsMegaMenuHovered] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-9 py-4 flex items-center justify-between">
          
          {/* سمت راست: لوگو و ناوبری */}
          <div className="flex items-center gap-6 sm:gap-10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-black hover:bg-gray-100 rounded-lg transition"
              aria-label="منو"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a href="#" className="font-black text-2xl tracking-[1.5px] text-black">
              NEXORA
            </a>

            <nav className="hidden lg:flex items-center gap-7">
              
              {/* دکمه دسته‌بندی‌ها متصل به مگامنو دسکتاپ */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsMegaMenuHovered(true)}
                onMouseLeave={() => setIsMegaMenuHovered(false)}
              >
                <button className="flex items-center gap-1.5 text-[14.5px] font-bold text-gray-900 hover:text-black transition">
                  <span>دسته‌بندی‌ها</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMegaMenuHovered ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {/* نمایش مگامنو با هاور */}
                {isMegaMenuHovered && <MegaMenuDesktop />}
              </div>

              <a href="#" className="text-[14.5px] font-bold text-gray-900 hover:text-gray-500 transition">
                تخفیف‌ها
              </a>
              <a href="#" className="text-[14.5px] font-bold text-gray-900 hover:text-gray-500 transition">
                راهنمای خرید
              </a>
              <a href="#" className="text-[14.5px] font-bold text-gray-900 hover:text-gray-500 transition">
                درباره ما
              </a>
            </nav>
          </div>

          {/* سمت چپ: ابزارها */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2 text-black hover:bg-gray-100 rounded-full transition" aria-label="جستجو">
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-black hover:bg-gray-100 rounded-full transition relative"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            <button className="p-2 text-black hover:bg-gray-100 rounded-full transition" aria-label="حساب کاربری">
              <User className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

        </div>
      </header>

      {/* منوی کشویی موبایل */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}