import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Heart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

interface LoveCounterProps {
  startDate: string; // YYYY-MM-DD
  partnerName: string;
  language: 'ar' | 'en';
}

export const LoveCounter: React.FC<LoveCounterProps> = ({
  startDate,
  partnerName,
  language,
}) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const isAr = language === 'ar';

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const stats = [
    { label: isAr ? 'يوم حب' : 'Days of Love', value: timeTogether.days },
    { label: isAr ? 'ساعة' : 'Hours', value: timeTogether.hours },
    { label: isAr ? 'دقيقة' : 'Minutes', value: timeTogether.minutes },
    { label: isAr ? 'ثانية' : 'Seconds', value: timeTogether.seconds },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl romantic-glass romantic-glow text-center">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
          <InfinityIcon className="w-3.5 h-3.5 text-rose-500" />
          {isAr ? 'حكايتنا مستمرة للأبد' : 'Our Forever Story'}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-cairo">
          {isAr ? `مع بعض في كل خطوة يا ${partnerName} 💕` : `Together Every Step of the Way 💕`}
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          {isAr ? 'كل ثانية بتمر وأنا بحبك أكتر من اللي قبلها ✨' : 'Every passing second I love you more than the last ✨'}
        </p>
      </div>

      {/* Counter Digits Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            className="p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-xs flex flex-col items-center justify-center"
          >
            <motion.span
              key={stat.value}
              initial={{ scale: 1.1, color: '#f43f5e' }}
              animate={{ scale: 1, color: '#e11d48' }}
              className="text-2xl sm:text-3xl font-black font-cairo tracking-tight"
            >
              {String(stat.value).padStart(2, '0')}
            </motion.span>
            <span className="text-xs font-semibold text-slate-500 mt-1">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
