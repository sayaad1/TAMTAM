import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, CheckCircle2, Utensils, PhoneCall, Moon, Compass, Coffee } from 'lucide-react';
import { LoveCoupon } from '../types';
import { romanticAudio } from '../utils/romanticAudio';
import confetti from 'canvas-confetti';

interface LoveCouponsProps {
  language: 'ar' | 'en';
}

const initialCoupons: LoveCoupon[] = [
  {
    id: 'c1',
    titleAr: 'كوبون حضن دافي غير محدود 🤗',
    titleEn: 'Unlimited Warm Hugs Pass 🤗',
    descAr: 'صالح للاستخدام في أي وقت وأي مكان بدون انتهاء صلاحية!',
    descEn: 'Redeemable anytime, anywhere with zero expiration date!',
    icon: 'Heart',
    redeemed: false,
  },
  {
    id: 'c2',
    titleAr: 'كوبون أكلة وخروجة على ذوقك 🍕',
    titleEn: 'Dinner & Date of Your Choice 🍕',
    descAr: 'تختاري المطعم والخروجة وكل طلباتك أوامر!',
    descEn: 'Pick any restaurant and hangout place, all wishes granted!',
    icon: 'Utensils',
    redeemed: false,
  },
  {
    id: 'c3',
    titleAr: 'كوبون روقان ومكالمة ليلية طويلة 🌙',
    titleEn: 'Late Night Talk & Chill Pass 🌙',
    descAr: 'مكالمة وسوالف للصبح حتى تنامي على صوتي وضحكتك.',
    descEn: 'A sweet late night call to talk about everything until sunrise.',
    icon: 'Moon',
    redeemed: false,
  },
  {
    id: 'c4',
    titleAr: 'كوبون مسامحة فوري لأي خلاف 🕊️',
    titleEn: 'Instant Sweet Forgiveness Pass 🕊️',
    descAr: 'لو زعلنا في أي وقت.. الكوبون ده يمسح أي زعل بابتسامة وبوسة!',
    descEn: 'Wipes away any tiny frown with an instant kiss and apology!',
    icon: 'Sparkles',
    redeemed: false,
  },
];

export const LoveCoupons: React.FC<LoveCouponsProps> = ({ language }) => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(initialCoupons);

  const isAr = language === 'ar';

  const handleRedeem = (id: string) => {
    romanticAudio.playCelebrationChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24'],
    });

    setCoupons(prev =>
      prev.map(c => (c.id === id ? { ...c, redeemed: true } : c))
    );
  };

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl romantic-glass romantic-glow">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          {isAr ? 'كوبونات وهدايا دلع خاصة' : 'Love Coupons & Promises'}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-cairo">
          {isAr ? 'كوبونات الحب ليكي إنتِ وبس 🎟️' : 'Coupons Made Just For You 🎟️'}
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          {isAr ? 'اضغطي على أي كوبون لاستخدامه وصرفه في أي وقت تحبيه!' : 'Click any coupon to redeem it whenever you want!'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map(coupon => (
          <motion.div
            key={coupon.id}
            whileHover={{ y: -3 }}
            className={`p-4 sm:p-5 rounded-2xl border-2 border-dashed relative overflow-hidden transition-all flex flex-col justify-between ${
              coupon.redeemed
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-xs'
                : 'bg-white/90 border-rose-300 text-slate-800 shadow-sm hover:border-rose-400'
            }`}
          >
            {/* Coupon cutout side circles */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-rose-50 rounded-full border-r border-rose-300 pointer-events-none" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-rose-50 rounded-full border-l border-rose-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-sm sm:text-base font-cairo text-rose-800">
                  {isAr ? coupon.titleAr : coupon.titleEn}
                </h4>
                {coupon.redeemed ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    {isAr ? 'تم استخدامه 💖' : 'Redeemed 💖'}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-100 text-rose-600">
                    {isAr ? 'صالح للأبد' : 'Valid Forever'}
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                {isAr ? coupon.descAr : coupon.descEn}
              </p>
            </div>

            <button
              onClick={() => handleRedeem(coupon.id)}
              disabled={coupon.redeemed}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                coupon.redeemed
                  ? 'bg-emerald-200/70 text-emerald-800 cursor-default'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
              }`}
            >
              {coupon.redeemed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تم تأكيد الكوبون في الحساب!' : 'Redeemed successfully!'}</span>
                </>
              ) : (
                <>
                  <Gift className="w-3.5 h-3.5" />
                  <span>{isAr ? 'اضغطي لاستخدام الكوبون ✨' : 'Redeem Coupon ✨'}</span>
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
