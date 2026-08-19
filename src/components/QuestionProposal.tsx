import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CuteBears } from './CuteBears';
import { BearPose } from '../types';
import { romanticAudio } from '../utils/romanticAudio';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

interface QuestionProposalProps {
  partnerName: string;
  onAccepted: () => void;
  language: 'ar' | 'en';
}

const noPhrasesAr = [
  'لا 🙈',
  'متأكدة؟! 🥺💔',
  'فكري تاني طيب! 🥺',
  'مش هتعرفي تدوسي! 🏃‍♂️💨',
  'أنا بحبك أكتر أصلاً 💕',
  'الزرار ده بايظ خلاص 🔒',
  'قولي أيوة بقى 😭',
  'مفيش غير أيوة يا روحي 🥰',
];

const noPhrasesEn = [
  'No 🙈',
  'Are you sure? 🥺💔',
  'Think again, please! 🥺',
  'Oops, too fast! 🏃‍♂️💨',
  'You love me anyway! 💕',
  'This button is locked 🔒',
  'Say yes already 😭',
  'Yes is the only way! 🥰',
];

export const QuestionProposal: React.FC<QuestionProposalProps> = ({
  partnerName,
  onAccepted,
  language,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [bearPose, setBearPose] = useState<BearPose>('holding_heart');
  const [bubbleText, setBubbleText] = useState<string>(
    language === 'ar' ? 'سؤال صغير من قلبي ليكي.. ✨' : 'A sweet question just for you.. ✨'
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const isAr = language === 'ar';
  const phrases = isAr ? noPhrasesAr : noPhrasesEn;
  const currentNoPhrase = phrases[Math.min(noCount, phrases.length - 1)];

  // Scale of YES button grows with each NO dodge
  const yesScale = Math.min(1 + noCount * 0.18, 1.9);

  const moveNoButton = () => {
    romanticAudio.playBoing();
    setNoCount(prev => prev + 1);
    setBearPose('sad_plead');

    // Random dodge position within bounds
    const maxX = 160;
    const maxY = 130;
    const randX = (Math.random() - 0.5) * 2 * maxX;
    const randY = (Math.random() - 0.5) * 2 * maxY;

    setNoPosition({ x: randX, y: randY });

    if (noCount === 0) {
      setBubbleText(isAr ? 'ليه كده؟ الدباديب زعلت 🥺' : 'Why No? The bears are crying 🥺');
    } else if (noCount === 1) {
      setBubbleText(isAr ? 'فكري بقلبك طيب.. 💕' : 'Think with your heart.. 💕');
    } else if (noCount >= 3) {
      setBubbleText(isAr ? 'مفيش مفر من حبي ليكي! 😂❤️' : 'No escape from my love! 😂❤️');
    }
  };

  const handleYes = () => {
    romanticAudio.playCelebrationChime();
    setBearPose('celebrating');
    setBubbleText(isAr ? 'كنت متأكد يا أحلى صدفة في حياتي! 🎉💖' : 'I knew it! My whole world! 🎉💖');

    // Multi-stage colorful confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff4b72', '#fb7185', '#fda4af', '#f43f5e', '#ffffff', '#fbbf24'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Transition smoothly after showing celebration
    setTimeout(() => {
      onAccepted();
    }, 1400);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto p-6 sm:p-10 rounded-3xl romantic-glass romantic-glow text-center overflow-visible"
    >
      {/* Top Floating Mini Sparkles */}
      <div className="absolute -top-4 left-6 text-rose-400 text-xl animate-bounce">✨</div>
      <div className="absolute -top-3 right-8 text-rose-400 text-xl animate-pulse">💖</div>

      {/* Greeting Header */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide border border-rose-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          {isAr ? `رسالة خاصة إلى ${partnerName}` : `Special message for ${partnerName}`}
        </span>
      </div>

      {/* Animated Grey & White Bear Sticker Duo */}
      <div className="my-2 flex justify-center">
        <CuteBears
          pose={bearPose}
          size="lg"
          interactive={true}
          bubbleText={bubbleText}
          onInteract={() => {
            if (bearPose === 'sad_plead') {
              setBearPose('holding_heart');
            } else {
              setBearPose('kissing');
              setTimeout(() => setBearPose('holding_heart'), 1800);
            }
          }}
        />
      </div>

      {/* Interactive Question */}
      <motion.h2
        key={noCount}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-2xl sm:text-3xl font-extrabold text-rose-900 mt-4 mb-2 leading-snug font-cairo"
      >
        {isAr ? (
          <>
            بتحبيني يا <span className="text-rose-600 underline decoration-rose-300 decoration-wavy">{partnerName}</span>؟ 💕
          </>
        ) : (
          <>
            Do you love me, <span className="text-rose-600">{partnerName}</span>? 💕
          </>
        )}
      </motion.h2>

      <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-sm mx-auto">
        {isAr
          ? 'جاوبي بصراحة.. الدباديب مستنية ردك بفارغ الصبر! ✨'
          : 'Answer honestly.. the bears are waiting for your answer! ✨'}
      </p>

      {/* Buttons Area */}
      <div className="relative min-h-[90px] flex items-center justify-center gap-5 sm:gap-8 flex-wrap pt-2">
        {/* YES BUTTON (Grows & Glows) */}
        <motion.button
          id="btn-yes-proposal"
          onClick={handleYes}
          style={{ transform: `scale(${yesScale})` }}
          whileHover={{ scale: yesScale * 1.08 }}
          whileTap={{ scale: yesScale * 0.94 }}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-400/50 hover:shadow-rose-500/70 border border-rose-300 transition-all flex items-center gap-2 cursor-pointer z-10"
        >
          <Heart className="w-5 h-5 fill-white animate-pulse" />
          <span>{isAr ? 'أيوة وبموت فيك! 💕' : 'Yes, forever! 💕'}</span>
        </motion.button>

        {/* ESCAPING NO BUTTON */}
        <motion.button
          id="btn-no-proposal"
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          onTouchStart={moveNoButton}
          animate={
            noPosition
              ? { x: noPosition.x, y: noPosition.y }
              : { x: 0, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 450, damping: 22 }}
          className="px-5 py-2.5 rounded-full bg-slate-200/90 hover:bg-slate-300 text-slate-700 font-semibold text-sm sm:text-base border border-slate-300 transition-colors shadow-sm cursor-pointer z-0 whitespace-nowrap"
        >
          <span>{currentNoPhrase}</span>
        </motion.button>
      </div>

      {/* Cute Hint if user tries many times */}
      {noCount >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-xs text-rose-500 flex items-center justify-center gap-1.5 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>
            {isAr
              ? 'الزرار التاني بيحبك أوي.. دوسي عليه وماتفكريش! 😉'
              : 'The Yes button is calling for you.. just press it! 😉'}
          </span>
        </motion.div>
      )}
    </div>
  );
};
