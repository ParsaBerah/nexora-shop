import React, { useEffect } from 'react';
import { 
  Users, Laptop, MapPin, Headphones, 
  ShieldCheck, Truck, RotateCcw, MessageSquare, ArrowLeft 
} from 'lucide-react';

export default function AboutPage({ onBackToHome, onGoToShop }) {
  // اطمینان از اسکرول به بالا هنگام بارگذاری صفحه
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20 pt-6" dir="rtl">
      
      {/* ۱. نوار مسیر (Breadcrumb) */}
      <nav className="max-w-[1380px] mx-auto px-4 sm:px-8 mb-10 text-xs font-semibold text-zinc-400 flex items-center gap-2 select-none">
        <button onClick={onBackToHome} className="hover:text-black transition cursor-pointer">
          فروشگاه نکسورا
        </button>
        <span>/</span>
        <span className="text-zinc-700 font-bold">درباره ما</span>
      </nav>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
        
        {/* ۲. بخش هیرو (معرفی اصلی) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-[1.4] tracking-tight mb-6">
              داستان نکسورا؛<br />فراتر از یک فروشگاه دیجیتال
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium leading-loose text-justify mb-8 max-w-xl">
              نکسورا مرجع تخصصی خرید لپ‌تاپ، کنسول‌های بازی و گجت‌های هوشمند است. 
              ما اینجا هستیم تا تجربه خرید کالای دیجیتال را با تمرکز بر اصالت، سرعت و پشتیبانی حرفه‌ای بازتعریف کنیم. 
              هدف ما ایجاد فضایی امن است تا کاربران بدون دغدغه فیک بودن یا تاخیر، به جدیدترین تکنولوژی‌های روز دسترسی داشته باشند.
            </p>
            <button
              onClick={onGoToShop}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl text-xs font-black hover:bg-zinc-800 transition active:scale-98 shadow-md cursor-pointer"
            >
              <span>مشاهده محصولات نکسورا</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          
          <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-[2.5rem] bg-zinc-100 overflow-hidden shadow-lg border border-zinc-100">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
              alt="فضای کاری نکسورا" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ۳. گرید آمار و ارقام */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black mb-1">+۵۰,۰۰۰</h3>
            <p className="text-xs font-bold text-zinc-400">مشتری وفادار</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black mb-1">+۲,۰۰۰</h3>
            <p className="text-xs font-bold text-zinc-400">کالای دیجیتال متنوع</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black mb-1">۳۱</h3>
            <p className="text-xs font-bold text-zinc-400">ارسال به تمام استان‌ها</p>
          </div>
          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-black mb-1">۲۴/۷</h3>
            <p className="text-xs font-bold text-zinc-400">پشتیبانی تخصصی</p>
          </div>
        </section>

        {/* ۴. داستان و چشم‌انداز (متن و تصویر) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[2.5rem] bg-zinc-100 overflow-hidden shadow-sm border border-zinc-100">
            <img 
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=2000" 
              alt="بسته‌بندی و ارسال کالا" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-6">وسواس در کیفیت؛ از انبار تا درب منزل</h2>
            <div className="space-y-6 text-sm font-medium text-zinc-500 leading-loose text-justify">
              <p>
                همه چیز از یک ایده ساده شروع شد: ایجاد بستری که کاربران ایرانی بتوانند کالاهای الکترونیکی گران‌قیمت را با خیالی آسوده خریداری کنند. در نکسورا، ما می‌دانیم که خرید یک لپ‌تاپ یا کنسول بازی تصمیم مهمی است. به همین دلیل، زنجیره تامین خود را مستقیماً به واردکنندگان اصلی متصل کرده‌ایم تا هرگونه واسطه و کالای تقلبی از چرخه حذف شود.
              </p>
              <p>
                علاوه بر اصالت، ما استاندارد جدیدی برای بسته‌بندی تعریف کرده‌ایم. قطعات حساس دیجیتال نیازمند مراقبت ویژه‌اند؛ از این رو تمامی سفارشات با پوشش‌های ضربه‌گیر اختصاصی و پلمپ امنیتی بسته‌بندی شده و در سریع‌ترین زمان ممکن به دست شما می‌رسند.
              </p>
            </div>
          </div>
        </section>

        {/* ۵. ارزش‌های بنیادین */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">ارزش‌های بنیادین نکسورا</h2>
            <p className="text-xs sm:text-sm font-bold text-zinc-400">اصولی که هر روز بر اساس آن‌ها کار می‌کنیم</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-100 hover:border-zinc-300 hover:shadow-xl transition-all duration-300">
              <ShieldCheck className="w-8 h-8 text-black mb-5" />
              <h3 className="text-sm font-black text-black mb-2">تضمین اصالت کالا</h3>
              <p className="text-xs font-semibold text-zinc-400 leading-relaxed">
                ارائه کالای اورجینال با گارانتی معتبر شرکتی؛ بدون هیچ‌گونه ریسک برای خریدار.
              </p>
            </div>
            
            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-100 hover:border-zinc-300 hover:shadow-xl transition-all duration-300">
              <Truck className="w-8 h-8 text-black mb-5" />
              <h3 className="text-sm font-black text-black mb-2">ارسال اکسپرس</h3>
              <p className="text-xs font-semibold text-zinc-400 leading-relaxed">
                تحویل ۲۴ ساعته در تهران و ۴۸ ساعته در سایر شهرستان‌ها با ایمن‌ترین ناوگان پستی.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-100 hover:border-zinc-300 hover:shadow-xl transition-all duration-300">
              <RotateCcw className="w-8 h-8 text-black mb-5" />
              <h3 className="text-sm font-black text-black mb-2">۷ روز مهلت تست</h3>
              <p className="text-xs font-semibold text-zinc-400 leading-relaxed">
                امکان بازگشت بی‌قیدوشرط کالا در صورت وجود هرگونه مشکل فنی در هفته اول خرید.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-100 hover:border-zinc-300 hover:shadow-xl transition-all duration-300">
              <MessageSquare className="w-8 h-8 text-black mb-5" />
              <h3 className="text-sm font-black text-black mb-2">مشاوره تخصصی</h3>
              <p className="text-xs font-semibold text-zinc-400 leading-relaxed">
                راهنمای خرید دقیق و بی‌طرفانه برای انتخاب بهترین محصول مطابق با بودجه شما.
              </p>
            </div>
          </div>
        </section>

        {/* ۶. کال‌تو‌اکشن نهایی */}
        <section className="bg-black text-white rounded-[2.5rem] p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* افکت پس‌زمینه تزئینی */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">آماده تجربه یک خرید متفاوت هستید؟</h2>
            <p className="text-sm font-semibold text-zinc-400 mb-8">
              همین حالا به فروشگاه نکسورا بپیوندید و از جدیدترین محصولات دیجیتال با بهترین قیمت بازار دیدن کنید.
            </p>
            <button
              onClick={onGoToShop}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl text-xs font-black hover:bg-zinc-100 transition active:scale-98 shadow-lg shadow-white/10 cursor-pointer"
            >
              <span>ورود به کاتالوگ محصولات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}