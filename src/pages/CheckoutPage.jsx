import React, { useState } from 'react';
import {
    ShieldCheck, Truck, CreditCard, ArrowRight, CheckCircle2,
    MapPin, User, Phone, Mail, ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage({ onBackToHome, onBackToShop }) {
    const { cartItems, totalPrice, clearCart } = useCart();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        province: 'تهران',
        city: 'تهران',
        address: '',
        postalCode: '',
        deliveryMethod: 'express', // express | regular
        paymentMethod: 'online',   // online | card
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [orderTrackingCode, setOrderTrackingCode] = useState('');

    const freeShippingThreshold = 40000000;
    const isFreeShipping = totalPrice >= freeShippingThreshold;
    const shippingCost = isFreeShipping ? 0 : (formData.deliveryMethod === 'express' ? 95000 : 65000);
    const finalPrice = totalPrice + shippingCost;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert('لطفاً نام، شماره تماس و آدرس دقیق را وارد کنید.');
            return;
        }
        // ثبت سفارش جدید در لیست سفارش‌های کاربر
        const newOrder = {
            id: randomCode,
            date: '۱۴۰۵/۰۲/۲۴',
            status: 'در حال پردازش',
            totalPrice: finalPrice,
            itemsCount: cartItems.length,
            items: cartItems.map((item) => ({
                title: item.title,
                price: item.price,
                count: item.quantity,
            })),
        };

        const existingOrders = JSON.parse(localStorage.getItem('nexora_orders') || '[]');
        localStorage.setItem('nexora_orders', JSON.stringify([newOrder, ...existingOrders]));
        // تولید شماره پیگیری اختصاصی رندوم
        const randomCode = 'NX-' + Math.floor(100000 + Math.random() * 900000);
        setOrderTrackingCode(randomCode);
        setIsSubmitted(true);

        clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // اگر سفارش ثبت شد: نمایش فاکتور نهایی
    if (isSubmitted) {
        return (
            <div className="min-h-[70vh] bg-white text-zinc-900 py-16 px-4" dir="rtl">
                <div className="max-w-xl mx-auto text-center">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-black mb-3">
                        سفارش شما با موفقیت ثبت شد!
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mb-8 leading-relaxed">
                        از خرید شما سپاسگزاریم. جزییات سفارش و فاکتور نهایی از طریق پیامک برای شماره تماس وارد شده ارسال خواهد شد.
                    </p>

                    <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 text-right space-y-4 mb-8">
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200/70">
                            <span className="text-zinc-400 font-bold">شماره پیگیری سفارش:</span>
                            <span className="font-mono font-black text-sm text-black">{orderTrackingCode}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200/70">
                            <span className="text-zinc-400 font-bold">تحویل‌گیرنده:</span>
                            <span className="font-bold text-zinc-800">{formData.fullName}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-200/70">
                            <span className="text-zinc-400 font-bold">مبلغ کل پرداخت شده:</span>
                            <span className="font-black text-black text-sm">{finalPrice.toLocaleString('fa-IR')} تومان</span>
                        </div>
                        <div className="flex items-start justify-between text-xs">
                            <span className="text-zinc-400 font-bold">آدرس ارسال:</span>
                            <span className="font-bold text-zinc-700 text-left max-w-[260px] leading-relaxed">
                                {formData.province}، {formData.city}، {formData.address}
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
                            مشاهده محصولات دیگر
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // اگر سبد خالی بود و کاربر اشتباهی به صفحه تسویه آمد
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4" dir="rtl">
                <div className="w-16 h-16 rounded-3xl bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
                    <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-black text-black mb-2">سبد خرید شما برای تسویه حساب خالی است</h3>
                <p className="text-xs text-zinc-400 mb-6 font-medium">لطفاً ابتدا کالایی را به سبد خرید اضافه کنید.</p>
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

            {/* Breadcrumb */}
            <nav className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-6 pb-2 text-xs font-semibold text-zinc-400 flex items-center gap-2 select-none">
                <button onClick={onBackToHome} className="hover:text-black transition cursor-pointer">فروشگاه نکسورا</button>
                <span>/</span>
                <button onClick={onBackToShop} className="hover:text-black transition cursor-pointer">سبد خرید</button>
                <span>/</span>
                <span className="text-zinc-700 font-bold">تسویه حساب و پرداخت</span>
            </nav>

            <div className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-4 pb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-black mb-8">تسویه حساب</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* ستون راست: فرم اطلاعات تحویل‌گیرنده و انتخاب ارسال (۸ ستون) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* ۱. مشخصات خریدار */}
                        <div className="border border-zinc-200/80 rounded-3xl p-6 sm:p-8 bg-white">
                            <h3 className="text-base font-black text-black mb-6 flex items-center gap-2.5">
                                <User className="w-5 h-5" />
                                <span>مشخصات تحویل‌گیرنده</span>
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
                                    <label className="block text-zinc-600 mb-2">شماره تماس (موبایل) *</label>
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
                                    <label className="block text-zinc-600 mb-2">ایمیل (جهت دریافت فاکتور - اختیاری)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition text-left dir-ltr"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ۲. نشانی پستی */}
                        <div className="border border-zinc-200/80 rounded-3xl p-6 sm:p-8 bg-white">
                            <h3 className="text-base font-black text-black mb-6 flex items-center gap-2.5">
                                <MapPin className="w-5 h-5" />
                                <span>آدرس ارسال بسته</span>
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
                                    <label className="block text-zinc-600 mb-2">نشانی کامل پستی *</label>
                                    <textarea
                                        rows={3}
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="نام خیابان، کوچه، پلاک، واحد..."
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
                                        placeholder="کد ۱۰ رقمی پستی بدون خط تیره"
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition text-left dir-ltr"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ۳. شیوه ارسال */}
                        <div className="border border-zinc-200/80 rounded-3xl p-6 sm:p-8 bg-white">
                            <h3 className="text-base font-black text-black mb-6 flex items-center gap-2.5">
                                <Truck className="w-5 h-5" />
                                <span>انتخاب شیوه تحویل</span>
                            </h3>

                            <div className="space-y-3">
                                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition ${formData.deliveryMethod === 'express' ? 'border-black bg-zinc-50/70 ring-1 ring-black' : 'border-zinc-200'
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
                                            <h4 className="text-xs font-black text-zinc-900">ارسال اکسپرس نکسورا (تهران ۲۴ ساعت / شهرستان ۴۸ ساعت)</h4>
                                            <p className="text-[11px] text-zinc-400 font-medium">بسته‌بندی ضربه‌گیر ویژه کالاهای حساس دیجیتال</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-zinc-800">
                                        {isFreeShipping ? 'رایگان' : '۹۵,۰۰۰ تومان'}
                                    </span>
                                </label>

                                <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition ${formData.deliveryMethod === 'regular' ? 'border-black bg-zinc-50/70 ring-1 ring-black' : 'border-zinc-200'
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
                                            <h4 className="text-xs font-black text-zinc-900">پست پیشتاز سراسری (۳ تا ۵ روز کاری)</h4>
                                            <p className="text-[11px] text-zinc-400 font-medium">تحویل درب منزل با ارائه کارت شناسایی</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-zinc-800">
                                        {isFreeShipping ? 'رایگان' : '۶۵,۰۰۰ تومان'}
                                    </span>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* ستون چپ: خلاصه فاکتور و دکمه پرداخت (۴ ستون) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="border border-zinc-200/80 rounded-3xl p-6 bg-white sticky top-24">
                            <h3 className="text-sm font-black text-black mb-4">خلاصه اقلام سفارش</h3>

                            {/* لیست کالاها */}
                            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 pr-1 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                                        <div className="flex items-center gap-2.5 min-w-0">
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

                            {/* محاسبات قیمت */}
                            <div className="space-y-3 pt-4 border-t border-zinc-100 text-xs font-bold">
                                <div className="flex items-center justify-between text-zinc-500">
                                    <span>مجموع کالاها:</span>
                                    <span className="text-zinc-900 font-black">{totalPrice.toLocaleString('fa-IR')} تومان</span>
                                </div>
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

                            {/* دکمه پرداخت */}
                            <button
                                type="submit"
                                className="w-full mt-6 py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition active:scale-98 shadow-lg shadow-black/10 cursor-pointer"
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>پرداخت و ثبت نهایی سفارش</span>
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-400">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>پرداخت امن متصل به درگاه بانکی شاپرک</span>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
}