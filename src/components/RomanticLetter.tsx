import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, MailOpen, Feather, Share2, Check } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface RomanticLetterProps {
  partnerName: string;
  senderName: string;
  language: 'ar' | 'en';
}

export const RomanticLetter: React.FC<RomanticLetterProps> = ({
  partnerName,
  senderName,
  language,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isAr = language === 'ar';

  const toggleLetter = () => {
    romanticAudio.playHeartPop();
    setIsOpen(prev => !prev);
  };

  const handleCopyQuote = () => {
    const textToCopy = isAr
      ? `أنتِ لستِ مجرد اسم.. أنتِ قصة لن أنساها أبداً 💕\n"You are not just a name, you are a story I will never forget"`
      : `You are not just a name, you are a story I will never forget 💕`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      {/* Interactive Envelope Trigger */}
      {!isOpen ? (
        <motion.div
          id="envelope-closed-trigger"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleLetter}
          className="cursor-pointer relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white via-rose-50 to-pink-50 border-2 border-rose-200 shadow-xl text-center overflow-hidden group"
        >
          {/* Decorative Corner Ribbons */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/40 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-200/40 rounded-tr-full pointer-events-none" />

          {/* Envelope Graphic */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-lg shadow-rose-400/40 group-hover:rotate-6 transition-transform mb-5">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              {isAr ? 'رسالة خاصة مختومة بالحب' : 'A special letter sealed with love'}
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 font-cairo">
              {isAr ? `إلى 💕 ${"فطومتي"} 💌` : `To My Beloved ${partnerName} 💌`}
            </h3>

            <p className="text-rose-600/80 text-sm sm:text-base font-medium max-w-md">
              {isAr ? 'اضغطي هنا لفتح الجواب السري وقراءة ما في قلبي..' : 'Click here to open the secret envelope and read my heart..'}
            </p>

            {/* Wax Seal Stamp */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-rose-300"
            >
              ❤️
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* Unfolded Letter Sheet */
        <AnimatePresence>
          <motion.div
            id="envelope-opened-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative p-7 sm:p-12 rounded-3xl bg-[#fffdf9] border-2 border-amber-200/80 shadow-2xl overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#fecdd3 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Top Bar Actions */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-6">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <Feather className="w-4 h-4 text-rose-500" />
                <span>{isAr ? `رسالة من ${senderName}` : `Letter from ${senderName}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyQuote}
                  title="Copy quote"
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة' : 'Share')}</span>
                </button>
                <button
                  onClick={toggleLetter}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 text-xs cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* The Main Heartfelt Quote Requested */}
            <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-rose-100/90 via-pink-50/90 to-rose-100/90 border border-rose-200 text-center shadow-xs">
              <p className="font-script text-2xl sm:text-3xl text-rose-600 leading-relaxed font-bold tracking-wide">
                &ldquo;If life were just moments, I would choose to spend every moment with you. 💕&rdquo;
              </p>
              <p className="mt-3 text-slate-700 font-cairo text-base sm:text-lg font-semibold leading-relaxed">
                &ldquo;ولو العمر لحظات، فأنا اختارت كل لحظاتي تكون معاكي. 💕.&rdquo;
              </p>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-cairo text-justify sm:text-right">
              <p>
                {isAr ? (
                  <>
                    حبيبتي الغالية <strong className="text-rose-600">{partnerName}</strong>،<br />
                    من أول يوم عرفتك فيه والدنيا بقت ألطف وأجمل بكتير. وجودك في حياتي بيخلق دايماً بهجة ودفء في كل لحظة. كل ضحكة منك بتنور يومي، وكل كلمة حلوه منك بتديني طاقة وحب.
                  </>
                ) : (
                  <>
                    My Dearest <strong className="text-rose-600">{partnerName}</strong>,<br />
                    Ever since you entered my life, every ordinary moment turned into magic. Your smile brightens my darkest days, and your laughter is my favorite song.
                  </>
                )}
              </p>

              <p>
                {isAr ? (
                  <>
                    عملتلك الصفحة دي مخصوص عشان تفكرك دايماً قد إيه إنتِ مميزة عندي، وقد إيه مكانتك في قلبي متتوصفش بكلام. الدباديب دي شبهنا.. بيفضلو دايماً جنب بعض وماتستغنوش عن بعض أبداً! ✨
                  </>
                ) : (
                  <>
                    I created this little cozy corner just to remind you how deeply treasured and loved you are. Like these two little bears, my heart will always stay right by your side! ✨
                  </>
                )}
              </p>

              <p className="text-rose-700 font-bold text-center pt-2 text-lg sm:text-xl">
                {isAr ? 'أحبك اليوم، وبكرة، وإلى ما بعد الأبد.. ❤️' : 'I love you today, tomorrow, and for all eternity.. ❤️'}
              </p>
            </div>

            {/* Sign-off Signature */}
            <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col items-end">
              <span className="text-xs text-slate-400">{isAr ? 'مكتوبة بحب خالص من:' : 'Written with endless love by:'}</span>
              <span className="font-romantic text-3xl sm:text-4xl text-rose-600 font-bold mt-1">
                {senderName}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
