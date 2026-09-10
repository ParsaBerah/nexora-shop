import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function CartDrawer({ onCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalCount,
  } = useCart();

  const { showToast } = useToast();

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 40000000;
  const isFreeShipping = totalPrice >= freeShippingThreshold;

  // محاسبه تخفیف کوپن
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((totalPrice * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.value;
    }
  }

  const finalPayable = Math.max(0, totalPrice - discountAmount + (isFreeShipping ? 0 : 75000));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();

    if (!cleanCode) {
      showToast('لطفاً کد تخفیف را وارد کنید.', 'error');
      return;
    }

    if (cleanCode === 'NEXORA10') {
      setAppliedCoupon({ code: 'NEXORA10', type: 'percent', value: 10, title: '۱۰٪ تخفیف ویژه نکسورا' });
      showToast('کد تخفیف ۱۰ درصدی با موفقیت اعمال شد!', 'success');
      setCouponInput('');
    } else if (cleanCode === 'WELCOME') {
      setAppliedCoupon({ code: 'WELCOME', type: 'fixed', value: 2000000, title: '۲ میلیون تومان تخفیف خوش‌آمدگویی' });
      showToast('تخفیف ۲ میلیون تومانی اعمال شد!', 'success');
      setCouponInput('');
    } else {
      showToast('کد تخفیف وارد شده معتبر یا فعال نیست.', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('کد تخفیف حذف گردید.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
      {/* بک‌دراپ تیره */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* پنل کشویی */}
      <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        
        {/* هدر */}
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black stroke-[2.5]" />
            <h3 className="font-black text-base text-zinc-900">سبد خرید</h3>
            <span className="text-xs font-bold text-zinc-400">({totalCount} کالا)</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-zinc-400 transition cursor-pointer"
            aria-label="بستن سبد"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* نوار وضعیت ارسال رایگان */}
        {cartItems.length > 0 && (
          <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100 text-xs font-bold text-zinc-700">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>سفارش شما شامل ارسال رایگان نکسورا شد!</span>
              </div>
            ) : (
              <div className="text-zinc-500">
                با خرید{' '}
                <span className="text-black font-black">
                  {(freeShippingThreshold - totalPrice).toLocaleString('fa-IR')}
                </span>{' '}
                تومان دیگر، ارسال رایگان می‌شود.
              </div>
            )}
          </div>
        )}

        {/* لیست محصولات */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h4 className="font-black text-sm text-zinc-800 mb-1">سبد خرید شما خالی است</h4>
              <p className="text-xs text-zinc-400 font-medium mb-6">
                محصولات مد نظر خود را از کاتالوگ فروشگاه انتخاب نمایید.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-black text-white text-xs font-black rounded-xl hover:bg-zinc-800 transition cursor-pointer"
              >
                مشاهده محصولات
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl border border-zinc-100 p-2 flex items-center justify-center flex-shrink-0 bg-white">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-zinc-800 line-clamp-2 leading-relaxed mb-2 text-right">
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 border border-zinc-200 rounded-xl px-2 py-1">
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-zinc-500 hover:text-black transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-black px-1 min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-zinc-500 hover:text-black transition cursor-pointer"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="text-left font-black text-xs text-zinc-900">
                      <span>{(item.price * item.quantity).toLocaleString('fa-IR')}</span>
                      <span className="text-[10px] text-zinc-400 mr-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* فیلد کوپن و فاکتور نهایی */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-zinc-100 bg-white space-y-4">
            
            {/* بخش کد تخفیف */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="کد تخفیف (مثال: NEXORA10)"
                    className="w-full text-xs font-bold px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black transition text-right"
                  />
                  <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-black rounded-xl transition cursor-pointer"
                >
                  ثبت
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{appliedCoupon.title}</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-rose-500 hover:text-rose-700 text-[11px] font-bold cursor-pointer mr-2"
                >
                  حذف
                </button>
              </div>
            )}

            {/* ارقام فاکتور */}
            <div className="space-y-2 text-xs font-bold">
              <div className="flex items-center justify-between text-zinc-500">
                <span>مجموع اقلام:</span>
                <span className="text-zinc-800">{totalPrice.toLocaleString('fa-IR')} تومان</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>تخفیف کوپن:</span>
                  <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}

              <div className="flex items-center justify-between text-zinc-500">
                <span>هزینه ارسال:</span>
                <span className={isFreeShipping ? 'text-emerald-600' : 'text-zinc-800'}>
                  {isFreeShipping ? 'رایگان' : '۷۵,۰۰۰ تومان'}
                </span>
              </div>

              <div className="flex items-center justify-between text-zinc-900 pt-2 border-t border-zinc-100 text-sm font-black">
                <span>مبلغ قابل پرداخت:</span>
                <div>
                  <span>{finalPayable.toLocaleString('fa-IR')}</span>
                  <span className="text-xs text-zinc-400 mr-1">تومان</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onCheckout) onCheckout(appliedCoupon);
              }}
              className="w-full py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition active:scale-98 shadow-md shadow-black/10 cursor-pointer"
            >
              <span>ادامه ثبت سفارش</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}