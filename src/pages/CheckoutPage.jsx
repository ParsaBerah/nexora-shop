import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, CreditCard, CheckCircle2, 
  MapPin, User, Tag, Check, ShoppingBag 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function CheckoutPage({ onBackToHome, onBackToShop, initialCoupon = null }) {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: 'تهران',
    city: 'تهران',
    address: '',
    postalCode: '',
    deliveryMethod: 'express',
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(initialCoupon);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const freeShippingThreshold = 40000000;
  const isFreeShipping = totalPrice >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : (formData.deliveryMethod === 'express' ? 95000 : 65000);

  // محاسبه تخفیف
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((totalPrice * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.value;
    }
  }

  const finalPrice = Math.max(0, totalPrice - discountAmount + shippingCost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'NEXORA10') {
      setAppliedCoupon({ code: 'NEXORA10', type: 'percent', value: 10, title: '۱۰٪ تخفیف ویژه نکسورا' });
      showToast('کد تخفیف ۱۰ درصدی اعمال شد!', 'success');
      setCouponCode('');
    } else if (clean === 'WELCOME') {
      setAppliedCoupon({ code: 'WELCOME', type: 'fixed', value: 2000000, title: '۲ میلیون تومان تخفیف خوش‌آمدگویی' });
      showToast('تخفیف ۲ میلیون تومانی اعمال شد!', 'success');
      setCouponCode('');
    } else {
      showToast('کد تخفیف معتبر نیست.', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('لطفاً فیلدهای الزامی (نام، شماره تماس و نشانی) را کامل کنید.', 'error');
      return;
    }

    const trackingId = 'NX-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      id: trackingId,
      date: '۱۴۰۵/۰۲/۲۴',
      status: 'در حال پردازش',
      totalPrice: finalPrice,
      discount: discountAmount,
      itemsCount: cartItems.length,
      customer: formData.fullName,
      address: `${formData.province}، ${formData.city}، ${formData.address}`,
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        count: item.quantity,
      })),
    };

    // ذخیره در سوابق سفارش‌های localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('nexora_orders') || '[]');
      localStorage.setItem('nexora_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setOrderSummary(newOrder);
    setIsSubmitted(true);
    clearCart();
    showToast('سفارش شما با موفقیت به ثبت رسید!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // فاکتور نهایی پس از ثبت سفارش
  if (isSubmitted && orderSummary) {
    return (
      <div className="min-h-[75vh] bg-white text-zinc-900 py-16 px-4" dir="rtl">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black mb-3">
            سفارش شما با موفقیت ثبت شد!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mb-8 leading-relaxed">
            کد رهگیری پیامک شد. بسته شما پس از بسته‌بندی ایمن آماده ارسال خواهد شد.
          </p>

          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 text-right space-y-4 mb-8">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200/70">
              <span className="text-zinc-400 font-bold">شماره سفارش:</span>
              <span className="font-mono font-black text-sm text-black">{orderSummary.id}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200/70">
              <span className="text-zinc-400 font-bold">تحویل‌گیرنده:</span>
              <span className="font-bold text-zinc-800">{orderSummary.customer}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200/70">
              <span className="text-zinc-400 font-bold">مبلغ نهایی پرداخت شده:</span>
              <span className="font-black text-black text-sm">{orderSummary.totalPrice.toLocaleString('fa-IR')} تومان</span>
            </div>
            <div className="flex items-start justify-between text-xs">
              <span className="text-zinc-400 font-bold">نشانی مقصد:</span>
              <span className="font-bold text-zinc-700 text-left max-w-[280px] leading-relaxed">
                {orderSummary.address}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onBackToHome}
              className="px-8 py-3.5 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black transition cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
            <button
              onClick={onBackToShop}
              className="px-8 py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-800 rounded-2xl text-xs font-bold transition cursor-pointer"
            >
              ادامه خرید در فروشگاه
            </button>
          </div>
        </div>
      </div>
    );
  }

  // اگر سبد خالی بود
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4" dir="rtl">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
          <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
        </div>
        <h3 className="text-lg font-black text-black mb-2">سبد خرید شما برای تسویه حساب خالی است</h3>
        <p className="text-xs text-zinc-400 mb-6 font-medium">کالاهای مدنظر خود را به سبد بیفزایید.</p>
        <button
          onClick={onBackToShop}
          className="px-6 py-3 bg-black text-white rounded-xl text-xs font-black hover:bg-zinc-800 transition cursor-pointer"
        >
          رفتن به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20" dir="rtl">
      <nav className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-6 pb-2 text-xs font-semibold text-zinc-400 flex items-center gap-2 select-none">
        <button onClick={onBackToHome} className="hover:text-black transition cursor-pointer">فروشگاه نکسورا</button>
        <span>/</span>
        <button onClick={onBackToShop} className="hover:text-black transition cursor-pointer">سبد خرید</button>
        <span>/</span>
        <span className="text-zinc-700 font-bold">تسویه حساب و فاکتور</span>
      </nav>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-4 pb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-black mb-8">تسویه حساب سفارش</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ستون راست فرم مشخصات */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* اطلاعات گیرنده */}
            <div className="border border-zinc-200/80 rounded-3xl p-6 sm:p-8 bg-white">
              <h3 className="text-base font-black text-black mb-6 flex items-center gap-2.5">
                <User className="w-5 h-5" />
                <span>اطلاعات تحویل‌گیرنده</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="block text-zinc-600 mb-2">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="مثال: پارسا برهمن"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 mb-2">شماره تماس همراه *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="۰۹۱۲..."
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition text-left dir-ltr"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-600 mb-2">ایمیل (جهت ارسال فاکتور - اختیاری)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition text-left dir-ltr"
                  />
                </div>
              </div>
            </div>

            {/* آدرس تحویل */}
            <div className="border border-zinc-200/80 rounded-3xl p-6 sm:p-8 bg-white">
              <h3 className="text-base font-black text-black mb-6 flex items-center gap-2.5">
                <MapPin className="w-5 h-5" />
                <span>نشانی تحویل بسته</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="block text-zinc-600 mb-2">استان</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 mb-2">شهر</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-600 mb-2">آدرس دقیق پستی *</label>
                  <textarea
                    rows={3}
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="خیابان، کوچه، پلاک، طبقه و واحد..."
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 mb-2">کد پستی ۱۰ رقمی</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="بدون خط تیره"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition text-left dir-ltr"
                  />
                </div>
              </div>
            </div>

            {/* شیوه حمل */}
            <div className="border border-zinc-200/80 rounded-3xl p-6 sm:p-8 bg-white">
              <h3 className="text-base font-black text-black mb-6 flex items-center gap-2.5">
                <Truck className="w-5 h-5" />
                <span>روش ارسال</span>
              </h3>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition ${
                  formData.deliveryMethod === 'express' ? 'border-black bg-zinc-50/70 ring-1 ring-black' : 'border-zinc-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={handleChange}
                      className="accent-black"
                    />
                    <div>
                      <h4 className="text-xs font-black text-zinc-900">ارسال اکسپرس ویژه نکسورا</h4>
                      <p className="text-[11px] text-zinc-400 font-medium">بسته‌بندی ضربه‌گیر ویژه تجهیزات الکترونیک</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-zinc-800">
                    {isFreeShipping ? 'رایگان' : '۹۵,۰۰۰ تومان'}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition ${
                  formData.deliveryMethod === 'regular' ? 'border-black bg-zinc-50/70 ring-1 ring-black' : 'border-zinc-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="regular"
                      checked={formData.deliveryMethod === 'regular'}
                      onChange={handleChange}
                      className="accent-black"
                    />
                    <div>
                      <h4 className="text-xs font-black text-zinc-900">پست پیشتاز کشوری</h4>
                      <p className="text-[11px] text-zinc-400 font-medium">تحویل استاندارد طی ۳ الی ۴ روز</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-zinc-800">
                    {isFreeShipping ? 'رایگان' : '۶۵,۰۰۰ تومان'}
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* ستون چپ: فاکتور و کد تخفیف */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-zinc-200/80 rounded-3xl p-6 bg-white sticky top-24">
              <h3 className="text-sm font-black text-black mb-4">اقلام سفارش</h3>

              <div className="max-h-52 overflow-y-auto divide-y divide-zinc-100 pr-1 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.image} alt={item.title} className="w-10 h-10 object-contain rounded-lg border border-zinc-100 p-1 flex-shrink-0" />
                      <span className="text-zinc-700 font-bold truncate max-w-[140px]">{item.title}</span>
                    </div>
                    <div className="text-left font-black text-zinc-900 flex-shrink-0">
                      <span className="text-zinc-400 text-[10px] ml-1">×{item.quantity}</span>
                      <span>{(item.price * item.quantity).toLocaleString('fa-IR')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* کد تخفیف داخل صفحه پرداخت */}
              <div className="pb-4 border-b border-zinc-100 mb-4">
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف (NEXORA10)"
                      className="flex-1 text-xs font-bold px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black transition text-right"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3 py-2.5 bg-black text-white text-xs font-black rounded-xl cursor-pointer"
                    >
                      اعمال
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCoupon.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        showToast('تخفیف برداشته شد.', 'info');
                      }}
                      className="text-rose-500 hover:text-rose-700 text-[11px] cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                )}
              </div>

              {/* مقادیر پرداختی */}
              <div className="space-y-3 text-xs font-bold">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>مجموع کالاها:</span>
                  <span className="text-zinc-900 font-black">{totalPrice.toLocaleString('fa-IR')} تومان</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600">
                    <span>میزان تخفیف:</span>
                    <span className="font-black">- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-zinc-500">
                  <span>هزینه حمل و نقل:</span>
                  <span className={isFreeShipping ? 'text-emerald-600 font-black' : 'text-zinc-900 font-black'}>
                    {isFreeShipping ? 'رایگان' : `${shippingCost.toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-black pt-4 border-t border-zinc-200 text-sm font-black">
                  <span>مبلغ کل پرداختی:</span>
                  <span className="text-base text-black">{finalPrice.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition active:scale-98 shadow-lg shadow-black/10 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>پرداخت و نهایی کردن خرید</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>تضمین امنیت پرداخت از طریق شاپرک</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}