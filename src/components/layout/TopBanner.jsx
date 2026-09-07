import React from 'react';
import { Truck } from 'lucide-react';

export default function TopBanner() {
  return (
    <aside className="w-full bg-black text-white py-2.5 px-4 flex items-center justify-center select-none z-50">
      <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
        <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2]" />
        <span>ارسال رایگان برای سفارش‌های بالای ۴ تومان</span>
      </div>
    </aside>
  );
}