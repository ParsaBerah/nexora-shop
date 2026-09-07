import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, Sparkles } from 'lucide-react';
import { megaMenuCategories } from '../../data/categoriesData';

export default function MegaMenuDesktop() {
  const [activeTab, setActiveTab] = useState(megaMenuCategories[0]);

  return (
    <div className="absolute top-full right-0 w-[940px] bg-white border border-gray-100 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] p-6 z-50 flex gap-6 text-right animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* ستون راست: لیست والدهای اصلی با تب‌بندی روی هاور */}
      <aside className="w-56 border-l border-gray-100 pl-3 flex flex-col gap-1 select-none">
        {megaMenuCategories.map((cat) => (
          <button
            key={cat.id}
            onMouseEnter={() => setActiveTab(cat)}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-black transition-all ${
              activeTab.id === cat.id
                ? 'bg-black text-white shadow-md shadow-black/10 translate-x-1'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <span>{cat.name}</span>
            <ChevronLeft className={`w-3.5 h-3.5 ${activeTab.id === cat.id ? 'opacity-100' : 'opacity-30'}`} />
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-gray-100 px-2">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[11px] font-black text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="w-3 h-3" />
          </a>
        </div>
      </aside>

      {/* ستون چپ: نمایش محتوای تب فعال */}
      <div className="flex-1 flex flex-col justify-between pr-2">
        <div>
          {/* تیتر گروه فعال */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <h3 className="text-sm font-black text-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              همه لوازم جانبی {activeTab.name}
            </h3>
            <a href="#" className="text-xs font-bold text-gray-400 hover:text-black transition">
              مشاهده دسته کامل
            </a>
          </div>

          {/* زیردسته‌ها */}
          <div className="grid grid-cols-3 gap-6">
            {activeTab.subcategories.map((group, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-xs font-extrabold text-zinc-900 mb-3 border-r-2 border-zinc-900 pr-2">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href="#"
                        className="text-xs font-semibold text-gray-500 hover:text-blue-600 hover:translate-x-0.5 transition-all block"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* برچسب‌های پرطرفدار پایین مگامنو */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-black text-amber-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>جستجوهای پرطرفدار:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeTab.popularTags.map((tag, tagIdx) => (
              <a
                key={tagIdx}
                href="#"
                className="text-[11px] font-bold bg-gray-50 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg transition"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}