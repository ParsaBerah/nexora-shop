import React, { useState, useEffect, useRef } from 'react';
import { X, Smartphone, KeyRound, CheckCircle2, LogOut, UserCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';


export default function AuthModal({ isOpen, onClose, user, onLoginSuccess, onLogout }) {
    const [step, setStep] = useState(1); // 1: شماره موبایل, 2: کد تایید
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(60);
    const otpInputs = useRef([]);
    const { showToast } = useToast();

    // ریست کردن فرم با هر بار باز شدن
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setPhoneNumber('');
            setOtpCode(['', '', '', '']);
            setTimer(60);
        }
    }, [isOpen]);

    // تایمر ارسال مجدد کد
    useEffect(() => {
        let interval = null;
        if (isOpen && step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, step, timer]);

    // بستن با Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    // ارسال شماره موبایل
    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 10) {
            showToast('لطفاً یک شماره موبایل معتبر وارد کنید.', 'error');
            return;
        }
        setStep(2);
        showToast('کد تایید آزمایشی ارسال شد.', 'info');
    };

    // تغییر فیلدهای OTP
    // تبدیل ارقام فارسی/عربی به انگلیسی و کنترل ورودی
    const handleOtpChange = (index, rawValue) => {
        // تبدیل اعداد فارسی به انگلیسی
        const englishValue = rawValue
            .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
            .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

        // فقط اجازه ثبت یک رقم عددی یا خالی بودن را بده
        const cleanChar = englishValue.replace(/\D/g, '').slice(-1);

        const newOtp = [...otpCode];
        newOtp[index] = cleanChar;
        setOtpCode(newOtp);

        // انتقال خودکار فوکوس به کادر بعدی
        if (cleanChar && index < 3) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    // تایید نهایی کد
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otpCode.join('').length < 4) {
            showToast('لطفاً کد تایید ۴ رقمی را کامل وارد کنید.', 'error');
            return;
        }

        // لاگین موفق دمو
        const loggedUser = {
            phone: phoneNumber,
            name: 'کاربر نکسورا',
            joinedAt: '۱۴۰۵',
        };
        onLoginSuccess(loggedUser);
        showToast('به نکسورا خوش آمدید! ورود موفقیت‌آمیز بود.', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
            {/* بک‌دراپ */}
            <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

            {/* باکس مودال */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 border border-zinc-100">

                {/* دکمه بستن */}
                <button
                    onClick={onClose}
                    className="absolute top-5 left-5 w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-zinc-400 transition cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* وضعیت وقتی کاربر از قبل لاگین است */}
                {user ? (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                            <UserCheck className="w-8 h-8 stroke-[2]" />
                        </div>
                        <h3 className="font-black text-lg text-black mb-1">{user.name}</h3>
                        <p className="text-xs text-zinc-400 font-bold mb-6 dir-ltr text-center">{user.phone}</p>

                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-xs font-bold text-zinc-600 space-y-2 mb-6 text-right">
                            <div className="flex justify-between">
                                <span className="text-zinc-400">وضعیت حساب:</span>
                                <span className="text-emerald-600 font-bold">تایید شده</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">عضویت از سال:</span>
                                <span>{user.joinedAt}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                onLogout();
                                onClose();
                            }}
                            className="w-full py-3.5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>خروج از حساب کاربری</span>
                        </button>
                    </div>
                ) : (
                    /* فرم ورود / ثبت‌نام */
                    <div>
                        {step === 1 ? (
                            <form onSubmit={handlePhoneSubmit}>
                                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4 text-black">
                                    <Smartphone className="w-6 h-6 stroke-[2]" />
                                </div>

                                <h3 className="font-black text-lg text-black mb-2">ورود یا ثبت‌نام</h3>
                                <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-6">
                                    برای مشاهده سفارش‌ها و خرید سریع‌تر، شماره موبایل خود را وارد کنید.
                                </p>

                                <div className="mb-6">
                                    <label className="block text-xs font-bold text-zinc-600 mb-2">شماره تلفن همراه</label>
                                    <input
                                        type="tel"
                                        dir="ltr"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                        className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-bold text-left focus:outline-none focus:border-black transition"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black transition active:scale-98 shadow-md cursor-pointer"
                                >
                                    ارسال کد تایید
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp}>
                                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-4 text-black">
                                    <KeyRound className="w-6 h-6 stroke-[2]" />
                                </div>

                                <h3 className="font-black text-lg text-black mb-2">کد تایید را وارد کنید</h3>
                                <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-6">
                                    کد ۴ رقمی ارسال‌شده به شماره <span className="font-bold text-black dir-ltr inline-block">{phoneNumber}</span> را وارد کنید.
                                </p>

                                {/* ورودی OTP */}
                                <div className="flex justify-center gap-3 mb-6" dir="ltr">
                                    {[0, 1, 2, 3].map((index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (otpInputs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            maxLength={1}
                                            value={otpCode[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            className="w-12 h-14 text-center text-lg font-black bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-black transition"
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-xs font-bold mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-zinc-500 hover:text-black transition cursor-pointer"
                                    >
                                        ویرایش شماره
                                    </button>

                                    {timer > 0 ? (
                                        <span className="text-zinc-400">{timer} ثانیه تا ارسال مجدد</span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setTimer(60)}
                                            className="text-black hover:underline cursor-pointer"
                                        >
                                            ارسال مجدد کد
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-black transition active:scale-98 shadow-md cursor-pointer"
                                >
                                    ورود به حساب نکسورا
                                </button>
                            </form>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}