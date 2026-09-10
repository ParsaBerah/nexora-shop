import React, { useState } from 'react';
import { 
  User, Package, MapPin, LogOut, ShieldCheck, 
  ChevronLeft, Clock, CheckCircle2, Phone, Mail, Calendar 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ProfilePage({ user, onLogout, onBackToHome, onGoToShop }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'info' | 'addresses'

  // خواندن تاریخچه سفارش‌ها از localStorage در صورت وجود
  const [orders] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'NX-894120',
          date: '۱۴۰۵/۰۲/۱۸',
          status: 'تحویل داده شده',
          totalPrice: 64490000,
          itemsCount: 1,
          items: [
            { title: 'لپ تاپ ۱۵.۶ اینچی ایسوس مدل TUF Gaming F15', price: 64490000, count: 1 }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  const handleLogoutClick = () => {
    onLogout();
    showToast('با موفقیت از حساب کاربری خارج شدید.', 'info');
    onBackToHome();
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 pb-20 pt-6" dir="rtl">
      {/* مسیر صفحه (Breadcrumb) */}
      <nav className="max-w-[1380px] mx-auto px-4 sm:px-8 mb-6 text-xs font-semibold text-zinc-400 flex items-center gap-2 select-none">
        <button onClick={onBackToHome} className="hover:text-black transition cursor-pointer">
          فروشگاه نکسورا
        </button>
        <span>/</span>
        <span className="text-zinc-700 font-bold">پروفایل کاربری</span>
      </nav>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* سایدبار پروفایل (۴ ستون) */}
          <aside className="lg:col-span-4 bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-xs">
            {/* مشخصات کلی کاربر */}
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-100">
              <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-black text-xl shadow-md shadow-black/10">
                {user?.name ? user.name[0] : 'U'}
              </div>
              <div className="flex-1 min-w-0 text-right">
                <h2 className="font-black text-base text-zinc-900 truncate">
                  {user?.name || 'کاربر نکسورا'}
                </h2>
                <span className="text-xs font-bold text-zinc-400 block mt-0.5 dir-ltr text-right">
                  {user?.phone || '۰۹۱۲۰۰۰۰۰۰۰'}
                </span>
              </div>
            </div>

            {/* منوی ناوبری سایدبار */}
            <div className="py-4 space-y-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-black text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>تاریخچه سفارش‌ها</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  activeTab === 'orders' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-700'
                }`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition cursor-pointer ${
                  activeTab === 'info'
                    ? 'bg-black text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>اطلاعات حساب کاربری</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-black text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>نشانی‌ها و آدرس‌ها</span>
                </div>
              </button>
            </div>

            {/* دکمه خروج از حساب */}
            <div className="pt-4 border-t border-zinc-100">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج از حساب نکسورا</span>
              </button>
            </div>
          </aside>

          {/* محتوای اصلی تب‌ها (۸ ستون) */}
          <main className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            
            {/* تب ۱: تاریخچه سفارش‌ها */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-6">
                  <div>
                    <h3 className="text-base font-black text-zinc-900">سفارش‌های من</h3>
                    <p className="text-xs text-zinc-400 mt-1">پیگیری وضعیت و فاکتورهای ثبت‌شده</p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                    <h4 className="font-bold text-sm text-zinc-700 mb-1">هنوز سفارشی ثبت نکرده‌اید</h4>
                    <p className="text-xs text-zinc-400 mb-6">محصولات مورد علاقه خود را انتخاب کنید.</p>
                    <button
                      onClick={onGoToShop}
                      className="px-6 py-2.5 bg-black text-white text-xs font-black rounded-xl hover:bg-zinc-800 transition cursor-pointer"
                    >
                      ورود به فروشگاه
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-300 transition">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100 text-xs font-bold">
                          <div className="flex items-center gap-3">
                            <span className="text-zinc-900 font-mono font-black">{ord.id}</span>
                            <span className="text-zinc-400 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {ord.date}
                            </span>
                          </div>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] rounded-full flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            {ord.status}
                          </span>
                        </div>

                        {/* جزئیات اقلام سفارش */}
                        <div className="py-4 space-y-2">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-zinc-700 font-medium truncate max-w-[280px] sm:max-w-md">
                                {it.title}
                              </span>
                              <span className="text-zinc-400 font-bold text-[11px]">
                                {it.count} عدد
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-black">
                          <span className="text-zinc-500 font-bold">مبلغ نهایی پرداخت شده:</span>
                          <span className="text-sm text-black">
                            {ord.totalPrice.toLocaleString('fa-IR')} تومان
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* تب ۲: اطلاعات کاربری */}
            {activeTab === 'info' && (
              <div>
                <div className="pb-6 border-b border-zinc-100 mb-6">
                  <h3 className="text-base font-black text-zinc-900">اطلاعات حساب کاربری</h3>
                  <p className="text-xs text-zinc-400 mt-1">مشخصات هویتی و راه‌های ارتباطی</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-zinc-400 block mb-1">نام و نام خانوادگی</span>
                    <span className="text-zinc-900 text-sm font-black">{user?.name || 'کاربر نکسورا'}</span>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-zinc-400 block mb-1">شماره تماس تایید شده</span>
                    <span className="text-zinc-900 text-sm font-black dir-ltr text-right block">
                      {user?.phone || '۰۹۱۲۰۰۰۰۰۰۰'}
                    </span>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-zinc-400 block mb-1">سطح عضویت نکسورا</span>
                    <span className="text-zinc-900 text-sm font-black flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      کاربر ویژه نقره‌ای
                    </span>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="text-zinc-400 block mb-1">تاریخ عضویت</span>
                    <span className="text-zinc-900 text-sm font-black">{user?.joinedAt || '۱۴۰۵'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* تب ۳: نشانی‌ها */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-6">
                  <div>
                    <h3 className="text-base font-black text-zinc-900">آدرس‌های ثبت‌شده</h3>
                    <p className="text-xs text-zinc-400 mt-1">محل‌های ارسال پیش‌فرض بسته‌ها</p>
                  </div>
                </div>

                <div className="border border-zinc-200/80 rounded-2xl p-5 bg-zinc-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-zinc-700" />
                      <h4 className="text-xs font-black text-zinc-900">آدرس پیش‌فرض تحویل</h4>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      فعال
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-600 leading-relaxed mb-3">
                    تهران، میدان ونک، خیابان ملاصدرا، پلاک ۲۴، واحد ۶
                  </p>
                  <div className="flex items-center gap-6 text-[11px] font-bold text-zinc-400">
                    <span>کد پستی: ۱۹۹۳۶۳۳۵۱۱</span>
                    <span>تحویل‌گیرنده: {user?.name || 'کاربر نکسورا'}</span>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}