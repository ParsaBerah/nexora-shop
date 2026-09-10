import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalCount,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 40000000; // ۴۰ میلیون تومان
  const isFreeShipping = totalPrice >= freeShippingThreshold;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
      {/* لایه تیره پس‌زمینه (Backdrop) */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* پنل کشویی */}
      <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        
        {/* هدر دراور */}
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

        {/* وضعیت ارسال رایگان */}
        {cartItems.length > 0 && (
          <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100 text-xs font-bold text-zinc-700">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>سفارش شما شامل **ارسال رایگان نکسورا** است!</span>
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

        {/* لیست محصولات درون سبد */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h4 className="font-black text-sm text-zinc-800 mb-1">سبد خرید شما خالی است</h4>
              <p className="text-xs text-zinc-400 font-medium mb-6">
                می‌توانید از بخش فروشگاه محصولات مورد نظر خود را اضافه کنید.
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
                {/* عکس محصول */}
                <div className="w-20 h-20 rounded-2xl border border-zinc-100 p-2 flex items-center justify-center flex-shrink-0 bg-white">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>

                {/* اطلاعات و کنترل تعداد */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-zinc-800 line-clamp-2 leading-relaxed mb-2 text-right">
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between pt-1">
                    {/* کنترلر مثبت و منفی */}
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

                    {/* قیمت */}
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

        {/* فوتر دراور: جمع کل و دکمه پرداخت */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-zinc-100 bg-white space-y-4">
            <div className="space-y-2 text-xs font-bold">
              <div className="flex items-center justify-between text-zinc-400">
                <span>هزینه ارسال:</span>
                <span className={isFreeShipping ? 'text-emerald-600 font-bold' : 'text-zinc-700 font-bold'}>
                  {isFreeShipping ? 'رایگان' : '۷۵,۰۰۰ تومان'}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-900 pt-2 border-t border-zinc-100">
                <span className="text-sm font-black">مبلغ قابل پرداخت:</span>
                <div className="text-base font-black">
                  <span>{(totalPrice + (isFreeShipping ? 0 : 75000)).toLocaleString('fa-IR')}</span>
                  <span className="text-xs text-zinc-400 mr-1">تومان</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onCheckout) onCheckout();
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