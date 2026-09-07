import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { megaMenuCategories } from '../../data/categoriesData';

export default function MobileMenu({ isOpen, onClose }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);

  if (!isOpen) return null;

  const toggleCategory = (id) => {
    setExpandedCat(expandedCat === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-[310px] bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <span className="font-black text-xl tracking-wider text-black">NEXORA</span>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-4 space-y-2 font-bold text-sm">
            {/* دسته‌بندی با قابلیت باز و بسته شدن */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between text-gray-900 py-3 text-right"
              >
                <span className="font-black">دسته‌بندی اکسسوری‌ها</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCategoriesOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isCategoriesOpen && (
                <div className="mt-2 mr-2 space-y-2.5 pr-2 border-r-2 border-gray-100 animate-in fade-in duration-200">
                  {megaMenuCategories.map((cat) => (
                    <div key={cat.id} className="text-right">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between text-xs font-bold text-gray-700 py-1.5 hover:text-black"
                      >
                        <span>{cat.name}</span>
                        <ChevronDown
                          className={`w-3 h-3 text-gray-400 transition-transform ${
                            expandedCat === cat.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {expandedCat === cat.id && (
                        <div className="mr-3 mt-1.5 space-y-1.5 pb-2 text-[11px] text-gray-500">
                          {cat.subcategories.flatMap((sub) => sub.items).slice(0, 5).map((item, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="block py-1 hover:text-blue-600 transition"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block text-gray-800 py-2.5 hover:text-blue-600 transition">
              تخفیف‌ها
            </a>
            <a href="#" className="block text-gray-800 py-2.5 hover:text-blue-600 transition">
              راهنمای خرید
            </a>
            <a href="#" className="block text-gray-800 py-2.5 hover:text-blue-600 transition">
              درباره ما
            </a>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 font-semibold text-center">
          © 2026 NEXORA
        </div>
      </div>
    </div>
  );
}