import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { SecretNote } from '../types';
import { romanticAudio } from '../utils/romanticAudio';

interface SecretBalloonsProps {
  language: 'ar' | 'en';
}

const initialNotes: SecretNote[] = [
  {
    id: 1,
    color: 'from-pink-400 to-rose-500',
    noteAr: 'جمالك في عيوني ملوش أي حدود، وكل يوم بتزيدي حلاوة! 🌸',
    noteEn: 'Your beauty is unmatched, getting prettier every single day! 🌸',
    popped: false,
  },
  {
    id: 2,
    color: 'from-rose-400 to-pink-600',
    noteAr: 'عارفة إني محظوظ جداً بيكي؟ ربنا يديمك في أيامي نعمة. ✨',
    noteEn: 'Do you know how lucky I am to have you? You are my truest blessing. ✨',
    popped: false,
  },
  {
    id: 3,
    color: 'from-purple-400 to-rose-400',
    noteAr: 'لما بتضحكي، الدنيا كلها بتضحك معاكي يا قمر. 🌙',
    noteEn: 'When you laugh, the whole universe stops to listen. 🌙',
    popped: false,
  },
  {
    id: 4,
    color: 'from-amber-400 to-rose-400',
    noteAr: 'وعد مني هفضل دايماً جنبك وسند ليكي في كل الأوقات. 🤝❤️',
    noteEn: 'My promise to you: I will forever be by your side. 🤝❤️',
    popped: false,
  },
];

export const SecretBalloons: React.FC<SecretBalloonsProps> = ({ language }) => {
  const [notes, setNotes] = useState<SecretNote[]>(initialNotes);

  const isAr = language === 'ar';

  const handlePop = (id: number) => {
    romanticAudio.playHeartPop();
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, popped: true } : n))
    );
  };

  const handleReset = () => {
    setNotes(initialNotes.map(n => ({ ...n, popped: false })));
  };

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl romantic-glass romantic-glow">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            {isAr ? 'بلالين المفاجآت والرسائل السرية' : 'Secret Surprise Balloons'}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-cairo">
            {isAr ? 'فرقعي البالونة واقرئي اللي جواها 🎈' : 'Pop a Balloon to Read Secret Message 🎈'}
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isAr ? 'إعادة نفخ البلالين' : 'Reset Balloons'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {notes.map(note => (
          <div key={note.id} className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {!note.popped ? (
                <motion.div
                  key="balloon"
                  whileHover={{ scale: 1.1, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePop(note.id)}
                  className={`w-24 h-32 sm:w-28 sm:h-36 rounded-t-full rounded-b-3xl bg-gradient-to-b ${note.color} shadow-lg cursor-pointer flex flex-col items-center justify-center text-white relative transition-all duration-300 animate-float-slow`}
                >
                  <Heart className="w-6 h-6 fill-white/80" />
                  <span className="text-[10px] font-bold mt-1 opacity-90">
                    {isAr ? 'اضغطي لفرقعتي!' : 'Pop Me!'}
                  </span>
                  {/* Balloon knot */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-2 bg-rose-600 rounded-b-xs" />
                  {/* String */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300 animate-sway" />
                </motion.div>
              ) : (
                <motion.div
                  key="note"
                  initial={{ scale: 0, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  className="w-full min-h-32 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-md text-slate-800 text-center flex flex-col items-center justify-center"
                >
                  <span className="text-xl mb-1">💌</span>
                  <p className="text-xs font-cairo font-bold leading-relaxed text-rose-900">
                    {isAr ? note.noteAr : note.noteEn}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
