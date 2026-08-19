import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BearPose } from '../types';
import { romanticAudio } from '../utils/romanticAudio';

interface CuteBearsProps {
  pose?: BearPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onInteract?: () => void;
  bubbleText?: string;
}

export const CuteBears: React.FC<CuteBearsProps> = ({
  pose = 'holding_heart',
  size = 'lg',
  interactive = true,
  onInteract,
  bubbleText,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickHeartCount, setClickHeartCount] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleBearClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    romanticAudio.playHeartPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = { id: Date.now() + Math.random(), x, y };
    setClickHeartCount(prev => [...prev.slice(-6), newHeart]);

    if (onInteract) {
      onInteract();
    }
  };

  const scaleMap = {
    sm: 'scale-75 w-44 h-36',
    md: 'scale-90 w-60 h-48',
    lg: 'scale-100 w-72 h-56',
    xl: 'scale-110 sm:scale-125 w-80 h-64',
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none">
      {/* Speech Bubble if present */}
      <AnimatePresence>
        {bubbleText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-2 px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-rose-200 text-rose-600 font-bold text-sm sm:text-base flex items-center gap-1.5 z-20"
          >
            <span>{bubbleText}</span>
            <span className="text-rose-500 animate-pulse">💕</span>
            {/* Bubble arrow pointing down */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-rose-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Vector Bear Canvas Box */}
      <motion.div
        id="cute-bears-container"
        className={`relative flex items-center justify-center cursor-pointer transition-transform ${scaleMap[size]}`}
        whileHover={interactive ? { scale: 1.04 } : {}}
        whileTap={interactive ? { scale: 0.96 } : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleBearClick}
      >
        {/* Floating Click Hearts */}
        {clickHeartCount.map(h => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: h.y, x: h.x, scale: 0.6 }}
            animate={{ opacity: 0, y: h.y - 80, scale: 1.4 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute pointer-events-none text-rose-500 text-2xl font-bold z-30"
          >
            💖
          </motion.div>
        ))}

        <svg
          viewBox="0 0 280 200"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Soft Shadow Filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#f43f5e" floodOpacity="0.25" />
            </filter>
            
            {/* Heart Gradient */}
            <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4b72" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            {/* Grey Bear Gradient */}
            <linearGradient id="greyBearGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>

            {/* White Bear Gradient */}
            <linearGradient id="whiteBearGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
          </defs>

          {/* ======================================================== */}
          {/* BEARS BODY RENDERING ACCORDING TO POSE */}
          {/* ======================================================== */}

          {/* POSE: HOLDING HEART (DEFAULT) */}
          {pose === 'holding_heart' && (
            <g>
              {/* Floating ambient hearts */}
              <motion.g
                animate={{ y: [-4, 4, -4], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <text x="135" y="42" fontSize="22" fill="#f43f5e" textAnchor="middle">✨</text>
                <text x="50" y="60" fontSize="16" fill="#fb7185">💖</text>
                <text x="215" y="55" fontSize="16" fill="#fb7185">💕</text>
              </motion.g>

              {/* GREY BEAR (LEFT) */}
              <motion.g
                animate={{ rotate: [-2, 2, -2], y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ originX: '90px', originY: '140px' }}
              >
                {/* Ears */}
                <circle cx="56" cy="76" r="18" fill="#9ca3af" />
                <circle cx="56" cy="76" r="11" fill="#fb7185" opacity="0.6" />
                <circle cx="106" cy="74" r="18" fill="#9ca3af" />
                <circle cx="106" cy="74" r="11" fill="#fb7185" opacity="0.6" />

                {/* Body */}
                <ellipse cx="85" cy="140" rx="36" ry="40" fill="url(#greyBearGrad)" />
                {/* Light Belly */}
                <ellipse cx="85" cy="145" rx="22" ry="24" fill="#e5e7eb" />

                {/* Head */}
                <ellipse cx="82" cy="100" rx="34" ry="30" fill="url(#greyBearGrad)" />
                {/* Snout */}
                <ellipse cx="85" cy="108" rx="15" ry="12" fill="#ffffff" />
                {/* Nose */}
                <ellipse cx="85" cy="104" rx="4" ry="3" fill="#374151" />
                {/* Mouth */}
                <path d="M 82 110 Q 85 114 88 110" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Eyes */}
                <circle cx="73" cy="98" r="3.5" fill="#1f2937" />
                <circle cx="74" cy="96.5" r="1.2" fill="#ffffff" />
                <circle cx="95" cy="98" r="3.5" fill="#1f2937" />
                <circle cx="96" cy="96.5" r="1.2" fill="#ffffff" />

                {/* Blushing cheeks */}
                <ellipse cx="66" cy="105" rx="6" ry="3.5" fill="#fda4af" opacity="0.85" />
                <ellipse cx="100" cy="105" rx="6" ry="3.5" fill="#fda4af" opacity="0.85" />

                {/* Left Arm holding heart */}
                <path d="M 60 125 Q 85 140 115 130" stroke="#9ca3af" strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Feet */}
                <ellipse cx="65" cy="172" rx="14" ry="9" fill="#9ca3af" />
                <ellipse cx="95" cy="172" rx="14" ry="9" fill="#9ca3af" />
              </motion.g>

              {/* WHITE BEAR (RIGHT) */}
              <motion.g
                animate={{ rotate: [2, -2, 2], y: [-2, 1, -2] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.3, ease: 'easeInOut' }}
                style={{ originX: '190px', originY: '140px' }}
              >
                {/* Ears */}
                <circle cx="174" cy="74" r="18" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="174" cy="74" r="11" fill="#fbcfe8" opacity="0.7" />
                <circle cx="224" cy="76" r="18" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="224" cy="76" r="11" fill="#fbcfe8" opacity="0.7" />

                {/* Body */}
                <ellipse cx="195" cy="140" rx="36" ry="40" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                {/* Light Belly */}
                <ellipse cx="195" cy="145" rx="22" ry="24" fill="#ffffff" />

                {/* Head */}
                <ellipse cx="198" cy="100" rx="34" ry="30" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                {/* Snout */}
                <ellipse cx="195" cy="108" rx="15" ry="12" fill="#ffffff" />
                {/* Nose */}
                <ellipse cx="195" cy="104" rx="4" ry="3" fill="#374151" />
                {/* Mouth */}
                <path d="M 192 110 Q 195 114 198 110" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Eyes (Cute happy closed arcs) */}
                <path d="M 180 98 Q 186 93 191 98" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 203 98 Q 208 93 214 98" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Blushing cheeks */}
                <ellipse cx="177" cy="105" rx="7" ry="4" fill="#f472b6" opacity="0.75" />
                <ellipse cx="213" cy="105" rx="7" ry="4" fill="#f472b6" opacity="0.75" />

                {/* Right Arm holding heart */}
                <path d="M 220 125 Q 195 140 165 130" stroke="#f3f4f6" strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Feet */}
                <ellipse cx="185" cy="172" rx="14" ry="9" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <ellipse cx="215" cy="172" rx="14" ry="9" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
              </motion.g>

              {/* SHARED BIG GLOWING HEART */}
              <motion.g
                animate={{ scale: [1, 1.15, 1], y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                style={{ originX: '140px', originY: '130px' }}
                filter="url(#softGlow)"
              >
                <path
                  d="M 140 148 C 140 148 112 130 112 112 C 112 99 122 92 132 92 C 137 92 140 96 140 96 C 140 96 143 92 148 92 C 158 92 168 99 168 112 C 168 130 140 148 140 148 Z"
                  fill="url(#heartGrad)"
                />
                {/* Heart shine */}
                <ellipse cx="128" cy="102" rx="4" ry="2" fill="#ffffff" opacity="0.6" transform="rotate(-30 128 102)" />
              </motion.g>
            </g>
          )}

          {/* POSE: HUGGING */}
          {pose === 'hugging' && (
            <g>
              <motion.g
                animate={{ scale: [1, 1.03, 1], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                style={{ originX: '140px', originY: '130px' }}
              >
                {/* Floating hearts above hug */}
                <text x="140" y="45" fontSize="24" textAnchor="middle">💖</text>
                <text x="95" y="65" fontSize="16">🌸</text>
                <text x="175" y="65" fontSize="16">✨</text>

                {/* Grey Bear base */}
                <ellipse cx="115" cy="135" rx="38" ry="42" fill="url(#greyBearGrad)" />
                <circle cx="85" cy="80" r="16" fill="#9ca3af" />
                <circle cx="85" cy="80" r="10" fill="#fb7185" opacity="0.6" />
                <ellipse cx="110" cy="100" rx="32" ry="28" fill="url(#greyBearGrad)" />
                {/* Blushing */}
                <ellipse cx="96" cy="106" rx="6" ry="3.5" fill="#fda4af" />
                {/* Happy closed eyes */}
                <path d="M 100 98 Q 106 93 112 98" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* White Bear leaning in tightly */}
                <ellipse cx="155" cy="135" rx="38" ry="42" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="185" cy="80" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="185" cy="80" r="10" fill="#fbcfe8" opacity="0.7" />
                <ellipse cx="160" cy="100" rx="32" ry="28" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                {/* Blushing */}
                <ellipse cx="174" cy="106" rx="7" ry="4" fill="#f472b6" opacity="0.8" />
                {/* Happy closed eyes */}
                <path d="M 148 98 Q 154 93 160 98" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Arms wrapping around each other */}
                {/* Grey arm hugging white bear */}
                <path d="M 100 120 Q 140 145 175 125" stroke="#9ca3af" strokeWidth="15" strokeLinecap="round" fill="none" />
                {/* White arm hugging grey bear */}
                <path d="M 170 120 Q 135 150 100 135" stroke="#f3f4f6" strokeWidth="14" strokeLinecap="round" fill="none" />

                {/* Feet */}
                <ellipse cx="100" cy="170" rx="14" ry="8" fill="#9ca3af" />
                <ellipse cx="170" cy="170" rx="14" ry="8" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
              </motion.g>
            </g>
          )}

          {/* POSE: KISSING */}
          {pose === 'kissing' && (
            <g>
              <motion.g
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                {/* Hearts bursting from the kiss */}
                <motion.g
                  animate={{ scale: [0.8, 1.2, 0.8], y: [-5, -15, -5], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                >
                  <text x="140" y="55" fontSize="26" textAnchor="middle">💋</text>
                  <text x="160" y="40" fontSize="18">💕</text>
                </motion.g>

                {/* Grey bear kissing */}
                <ellipse cx="110" cy="135" rx="35" ry="40" fill="url(#greyBearGrad)" />
                <circle cx="80" cy="78" r="16" fill="#9ca3af" />
                <circle cx="80" cy="78" r="10" fill="#fb7185" opacity="0.6" />
                <ellipse cx="115" cy="100" rx="32" ry="28" fill="url(#greyBearGrad)" />
                {/* Kissing snout stretched towards white bear */}
                <ellipse cx="138" cy="104" rx="12" ry="9" fill="#e5e7eb" />
                <ellipse cx="145" cy="103" rx="3" ry="2" fill="#374151" />
                <path d="M 143 106 Q 148 107 143 108" stroke="#374151" strokeWidth="2" fill="none" />
                <ellipse cx="102" cy="107" rx="6" ry="3" fill="#fda4af" />
                {/* Closed kissing eyes */}
                <path d="M 108 97 Q 114 93 120 97" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* White bear blushing deeply and receiving kiss */}
                <ellipse cx="170" cy="135" rx="35" ry="40" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="198" cy="78" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="198" cy="78" r="10" fill="#fbcfe8" opacity="0.7" />
                <ellipse cx="165" cy="100" rx="32" ry="28" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                {/* Deep rosy cheek from kiss */}
                <ellipse cx="150" cy="105" rx="9" ry="5" fill="#f43f5e" opacity="0.9" />
                <ellipse cx="185" cy="105" rx="7" ry="4" fill="#f472b6" opacity="0.8" />
                {/* Heart eyes or happy closed eyes */}
                <text x="160" y="98" fontSize="13" fill="#e11d48">♥</text>
                <text x="178" y="98" fontSize="13" fill="#e11d48">♥</text>

                {/* Feet */}
                <ellipse cx="95" cy="170" rx="13" ry="8" fill="#9ca3af" />
                <ellipse cx="180" cy="170" rx="13" ry="8" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
              </motion.g>
            </g>
          )}

          {/* POSE: SAD PLEAD (When user hovers or tries to click "No") */}
          {pose === 'sad_plead' && (
            <g>
              <motion.g
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              >
                {/* Broken heart or rain cloud above */}
                <text x="140" y="45" fontSize="22" textAnchor="middle">🥺💔</text>

                {/* Grey bear sniffling */}
                <ellipse cx="90" cy="140" rx="35" ry="38" fill="url(#greyBearGrad)" />
                <circle cx="62" cy="80" r="16" fill="#9ca3af" />
                <circle cx="112" cy="78" r="16" fill="#9ca3af" />
                <ellipse cx="87" cy="105" rx="32" ry="28" fill="url(#greyBearGrad)" />
                {/* Sad puppy eyes */}
                <circle cx="76" cy="102" r="6" fill="#1f2937" />
                <circle cx="78" cy="99" r="2.5" fill="#ffffff" />
                <circle cx="98" cy="102" r="6" fill="#1f2937" />
                <circle cx="100" cy="99" r="2.5" fill="#ffffff" />
                {/* Teardrop falling */}
                <motion.circle
                  cx="70"
                  cy="115"
                  r="3"
                  fill="#60a5fa"
                  animate={{ y: [0, 15, 30], opacity: [1, 0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                {/* Sad downturned mouth */}
                <path d="M 83 118 Q 87 113 91 118" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Paws pleading together */}
                <ellipse cx="87" cy="135" rx="8" ry="10" fill="#e5e7eb" />

                {/* White bear sniffling & sad */}
                <ellipse cx="190" cy="140" rx="35" ry="38" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="168" cy="78" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="218" cy="80" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <ellipse cx="193" cy="105" rx="32" ry="28" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                {/* Sad eyes */}
                <circle cx="182" cy="102" r="6" fill="#1f2937" />
                <circle cx="184" cy="99" r="2.5" fill="#ffffff" />
                <circle cx="204" cy="102" r="6" fill="#1f2937" />
                <circle cx="206" cy="99" r="2.5" fill="#ffffff" />
                {/* Teardrop */}
                <motion.circle
                  cx="210"
                  cy="115"
                  r="3"
                  fill="#60a5fa"
                  animate={{ y: [0, 15, 30], opacity: [1, 0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.1, delay: 0.3 }}
                />
                {/* Sad mouth */}
                <path d="M 189 118 Q 193 113 197 118" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Paws together */}
                <ellipse cx="193" cy="135" rx="8" ry="10" fill="#ffffff" stroke="#e5e7eb" />
              </motion.g>
            </g>
          )}

          {/* POSE: CELEBRATING (YES pressed!) */}
          {pose === 'celebrating' && (
            <g>
              <motion.g
                animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                style={{ originX: '140px', originY: '120px' }}
              >
                {/* Confetti and sparkles */}
                <text x="140" y="38" fontSize="28" textAnchor="middle">🎉🥳</text>
                <text x="60" y="50" fontSize="18">✨</text>
                <text x="220" y="50" fontSize="18">💖</text>

                {/* Grey bear jumping with joy */}
                <ellipse cx="90" cy="130" rx="35" ry="38" fill="url(#greyBearGrad)" />
                <circle cx="62" cy="70" r="16" fill="#9ca3af" />
                <circle cx="112" cy="68" r="16" fill="#9ca3af" />
                <ellipse cx="87" cy="95" rx="32" ry="28" fill="url(#greyBearGrad)" />
                {/* Happy stars/open eyes */}
                <ellipse cx="87" cy="102" rx="14" ry="10" fill="#ffffff" />
                <circle cx="87" cy="98" rx="4" ry="3" fill="#374151" />
                {/* Big happy open smile */}
                <path d="M 80 102 Q 87 112 94 102 Z" fill="#e11d48" />
                {/* Arms raised up in celebration */}
                <path d="M 65 110 Q 50 85 45 70" stroke="#9ca3af" strokeWidth="12" strokeLinecap="round" fill="none" />
                <path d="M 110 110 Q 125 85 130 70" stroke="#9ca3af" strokeWidth="12" strokeLinecap="round" fill="none" />
                <ellipse cx="72" cy="100" rx="6" ry="3.5" fill="#fda4af" />
                <ellipse cx="102" cy="100" rx="6" ry="3.5" fill="#fda4af" />

                {/* White bear jumping with joy */}
                <ellipse cx="190" cy="130" rx="35" ry="38" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="165" cy="68" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="218" cy="70" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <ellipse cx="193" cy="95" rx="32" ry="28" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                {/* Big happy smile */}
                <ellipse cx="193" cy="102" rx="14" ry="10" fill="#ffffff" />
                <circle cx="193" cy="98" rx="4" ry="3" fill="#374151" />
                <path d="M 186 102 Q 193 112 200 102 Z" fill="#e11d48" />
                {/* Arms raised up */}
                <path d="M 170 110 Q 155 85 150 70" stroke="#f3f4f6" strokeWidth="12" strokeLinecap="round" fill="none" />
                <path d="M 215 110 Q 230 85 235 70" stroke="#f3f4f6" strokeWidth="12" strokeLinecap="round" fill="none" />
                <ellipse cx="178" cy="100" rx="7" ry="4" fill="#f472b6" opacity="0.8" />
                <ellipse cx="208" cy="100" rx="7" ry="4" fill="#f472b6" opacity="0.8" />
              </motion.g>
            </g>
          )}

          {/* POSE: SHY BLUSH / IDLE */}
          {(pose === 'idle' || pose === 'shy_blush') && (
            <g>
              <motion.g
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                {/* Holding hands shyly */}
                <ellipse cx="90" cy="140" rx="35" ry="38" fill="url(#greyBearGrad)" />
                <ellipse cx="85" cy="100" rx="32" ry="28" fill="url(#greyBearGrad)" />
                <circle cx="62" cy="78" r="16" fill="#9ca3af" />
                <circle cx="112" cy="76" r="16" fill="#9ca3af" />
                <circle cx="76" cy="98" r="3.5" fill="#1f2937" />
                <circle cx="96" cy="98" r="3.5" fill="#1f2937" />
                <ellipse cx="68" cy="105" rx="7" ry="4" fill="#fda4af" />
                <ellipse cx="102" cy="105" rx="7" ry="4" fill="#fda4af" />
                <path d="M 82 108 Q 86 112 90 108" stroke="#374151" strokeWidth="2" fill="none" />

                <ellipse cx="190" cy="140" rx="35" ry="38" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                <ellipse cx="195" cy="100" rx="32" ry="28" fill="url(#whiteBearGrad)" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="168" cy="76" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <circle cx="218" cy="78" r="16" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
                <path d="M 182 98 Q 187 93 192 98" stroke="#1f2937" strokeWidth="2.5" fill="none" />
                <path d="M 202 98 Q 207 93 212 98" stroke="#1f2937" strokeWidth="2.5" fill="none" />
                <ellipse cx="178" cy="105" rx="8" ry="4.5" fill="#f472b6" opacity="0.8" />
                <ellipse cx="212" cy="105" rx="8" ry="4.5" fill="#f472b6" opacity="0.8" />

                {/* Hand in hand in middle */}
                <path d="M 115 135 Q 140 148 165 135" stroke="#9ca3af" strokeWidth="10" strokeLinecap="round" fill="none" />
                <text x="140" y="125" fontSize="16" textAnchor="middle">💕</text>
              </motion.g>
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
