import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';

const usages = ['گیمینگ حرفه‌ای', 'برنامه‌نویسی و اداری', 'دانشجویی و وبگردی', 'طراحی و رندرینگ'];
const budgets = ['تا ۳۰ میلیون', '۳۰ تا ۶۰ میلیون', '۶۰ تا ۱۰۰ میلیون', 'بالای ۱۰۰ میلیون'];

export default function SmartFinder() {
  const [selectedUsage, setSelectedUsage] = useState(usages[0]);
  const [selectedBudget, setSelectedBudget] = useState(budgets[1]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-10 sm:py-14">
      <div className="max-w-[1380px] mx-auto bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white rounded-[40px] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-zinc-300 mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>راهنمای هوشمند خرید</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            دقیقاً دنبال چه محصولی هستی؟
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            کاربرد و بودجه خود را مشخص کن تا بهترین گزینه‌های بازار را به شما پیشنهاد دهیم.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* انتخاب کاربرد */}
          <div>
            <span className="block text-xs font-extrabold text-zinc-400 mb-3 text-right">
              ۱. نوع کاربری شما چیست؟
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {usages.map((usage) => (
                <button
                  key={usage}
                  type="button"
                  onClick={() => setSelectedUsage(usage)}
                  className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    selectedUsage === usage
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-[1.02]'
                      : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {usage}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب بودجه */}
          <div>
            <span className="block text-xs font-extrabold text-zinc-400 mb-3 text-right">
              ۲. محدوده بودجه مدنظر:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {budgets.map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setSelectedBudget(budget)}
                  className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    selectedBudget === budget
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-[1.02]'
                      : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          {/* دکمه جستجو */}
          <div className="pt-4 flex justify-center">
            <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 w-full sm:w-auto min-w-[240px]">
              <Search className="w-4 h-4" />
              <span>یافتن بهترین پیشنهادها</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}