import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star, Smile, ShieldCheck, Sun, Moon, Compass, Coffee } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import { LoveReason } from '../types';

interface ReasonsWhyILoveYouProps {
  language: 'ar' | 'en';
}

const defaultReasons: LoveReason[] = [
  {
    id: 1,
    textAr: 'ضحكتك العفوية اللي بتنسيني أي تعب في ثانية واحدة 💕',
    textEn: 'Your spontaneous laugh that washes away any tiredness in a second 💕',
    iconName: 'Smile',
  },
  {
    id: 2,
    textAr: 'طيبة قلبك واهتمامك بالتفاصيل الصغيرة اللي محدش بياخد باله منها ✨',
    textEn: 'Your gentle heart and how deeply you care about the smallest details ✨',
    iconName: 'Heart',
  },
  {
    id: 3,
    textAr: 'لما بتسمعي كلامي وتشاركيني أحلامك وأفكارك بروحك الحلوة 🌙',
    textEn: 'Sharing your dreams, wild ideas, and sweetest thoughts with me 🌙',
    iconName: 'Moon',
  },
  {
    id: 4,
    textAr: 'طريقتك وأنتِ بتعاندي بدلع.. أحلى وأطيب عند في الدنيا! 🙈',
    textEn: 'The cute way you tease and pout when you want something 🙈',
    iconName: 'Sparkles',
  },
  {
    id: 5,
    textAr: 'الأمان والراحة اللي بحس بيهم بمجرد ما أسمع صوتك أو أشوف رسايلك 🌟',
    textEn: 'The comforting peace I feel the moment I hear your sweet voice 🌟',
    iconName: 'ShieldCheck',
  },
  {
    id: 6,
    textAr: 'إنك مش بس حبيبتي، إنتِ صاحبتي وسندي وأجمل جزء في يومي ☕',
    textEn: 'That you are not just my love, but my best friend and favorite chapter ☕',
    iconName: 'Coffee',
  },
];

export const ReasonsWhyILoveYou: React.FC<ReasonsWhyILoveYouProps> = ({ language }) => {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([1]);
  const [selectedReason, setSelectedReason] = useState<LoveReason | null>(defaultReasons[0]);

  const isAr = language === 'ar';

  const handleUnlock = (reason: LoveReason) => {
    romanticAudio.playHeartPop();
    if (!unlockedIds.includes(reason.id)) {
      setUnlockedIds(prev => [...prev, reason.id]);
    }
    setSelectedReason(reason);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Moon': return <Moon className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <div className="my-10 p-6 sm:p-10 rounded-3xl romantic-glass romantic-glow">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          {isAr ? 'برطمان أسباب حبي ليكي' : 'Reasons Why I Adore You'}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-cairo">
          {isAr ? 'ليه إنتِ تحديداً؟ 💕' : 'Why You Are My Everything 💕'}
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          {isAr ? 'اضغطي على البطاقات لاكتشاف أسرار حبي ليكي واحدة بواحدة' : 'Tap each card to reveal sweet reasons one by one'}
        </p>
      </div>

      {/* Grid of Reasons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {defaultReasons.map((r, idx) => {
          const isUnlocked = unlockedIds.includes(r.id);
          const isSelected = selectedReason?.id === r.id;

          return (
            <motion.button
              key={r.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleUnlock(r)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-300/50'
                  : isUnlocked
                  ? 'bg-white/90 hover:bg-rose-50/80 text-slate-800 border-rose-200 shadow-xs'
                  : 'bg-rose-50/50 hover:bg-rose-100/60 text-slate-400 border-dashed border-rose-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'
                }`}
              >
                {getIcon(r.iconName)}
              </div>
              <span className="text-xs font-bold">
                {isAr ? `سبب رقم #${idx + 1}` : `Reason #${idx + 1}`}
              </span>
              {!isUnlocked && (
                <span className="text-[10px] text-rose-400 font-medium">
                  {isAr ? 'اضغطي للفتح ✨' : 'Tap to reveal ✨'}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Selected Card Display */}
      {selectedReason && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedReason.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white text-center shadow-lg relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-3xl mb-2">💖</span>
              <p className="text-lg sm:text-xl font-bold font-cairo leading-relaxed max-w-xl">
                &ldquo;{isAr ? selectedReason.textAr : selectedReason.textEn}&rdquo;
              </p>
              <span className="text-xs text-rose-100 font-medium mt-3">
                {isAr ? `السبب #${selectedReason.id} من بين ملايين الأسباب!` : `Reason #${selectedReason.id} among millions!`}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
