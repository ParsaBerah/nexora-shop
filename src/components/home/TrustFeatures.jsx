import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'ضمانت کالا',
    desc: 'تضمین خرید مطمئن',
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: 'ارسال سریع',
    desc: '۲۴ تا ۴۸ ساعت',
    icon: Truck,
  },
  {
    id: 3,
    title: 'بازگشت آسان',
    desc: 'تا ۷ روز پس از خرید',
    icon: RotateCcw,
  },
  {
    id: 4,
    title: 'پرداخت امن',
    desc: 'با رمزنگاری معتبر',
    icon: Lock,
  },
];

export default function TrustFeatures() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-9 py-6">
      <div className="max-w-[1380px] mx-auto py-6 sm:py-9 border-y-[1.5px] border-dashed border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 text-black bg-gray-50 rounded-2xl">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                </div>
                <div className="flex flex-col text-right min-w-0">
                  <h3 className="text-xs sm:text-[15px] font-black text-black leading-snug truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-[13px] font-semibold text-gray-500 mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}