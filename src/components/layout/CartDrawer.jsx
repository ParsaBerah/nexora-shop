import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => {
    const numericPrice = typeof item.price === 'number' ? item.price : 0;
    return sum + numericPrice * item.qty;
  }, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* بک‌دراپ تاریک */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* هدر کشو */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-base font-extrabold text-black">سبد خرید شما</h2>
              <span className="bg-gray-100 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* لیست آیتم‌ها */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-3">
                <ShoppingBag className="w-14 h-14 stroke-1" />
                <p className="text-sm font-semibold">سبد خرید شما در حال حاضر خالی است!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-gray-50/70 border border-gray-100 rounded-2xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-extrabold text-black mt-1">
                      {item.price ? `${item.price.toLocaleString('fa-IR')} تومان` : 'تماس بگیرید'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* فوتر کشو با مجموع و دکمه پرداخت */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">مجموع سفارش:</span>
                <span className="text-base font-black text-black">
                  {totalPrice.toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <button className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98]">
                تکمیل سفارش و تسویه حساب
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}