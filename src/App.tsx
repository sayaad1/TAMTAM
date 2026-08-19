/**
 * Romantic Love Story Web Experience
 * Specially created for the user's girlfriend with interactive animated Grey & White bears,
 * playful proposal box, sweet music box, customizable love letter, memory album, and romantic quotes.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Settings, RotateCcw, Volume2, Music, Feather, Stars } from 'lucide-react';
import { QuestionProposal } from './components/QuestionProposal';
import { CuteBears } from './components/CuteBears';
import { RomanticLetter } from './components/RomanticLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveCounter } from './components/LoveCounter';
import { ReasonsWhyILoveYou } from './components/ReasonsWhyILoveYou';
import { LoveCoupons } from './components/LoveCoupons';
import { SecretBalloons } from './components/SecretBalloons';
import { FloatingHeartsCanvas } from './components/FloatingHeartsCanvas';
import { PersonalizationModal } from './components/PersonalizationModal';
import { CoupleConfig, BearPose } from './types';

export default function App() {
  const [config, setConfig] = useState<CoupleConfig>(() => {
    const saved = localStorage.getItem('love_app_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      partnerName:'Fatma',
      senderName: 'Youssef',
      startDate: '2026-06-14',
      mainQuoteEn: 'You are not just a name, you are a story I will never forget 💕',
      mainQuoteAr: ' أنتِ لستِ مجرد اسم، أنتِ قصة وحياة لن أنساها أبداً 💕',
      loveLetter: '',
      musicEnabled: true,
      language: 'ar',
    };
  });

  const [hasAcceptedProposal, setHasAcceptedProposal] = useState<boolean>(() => {
    return localStorage.getItem('love_accepted') === 'true';
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [heroBearPose, setHeroBearPose] = useState<BearPose>('holding_heart');

  useEffect(() => {
    localStorage.setItem('love_app_config', JSON.stringify(config));
  }, [config]);

  const handleProposalAccepted = () => {
    setHasAcceptedProposal(true);
    localStorage.setItem('love_accepted', 'true');
  };

  const handleResetToProposal = () => {
    setHasAcceptedProposal(false);
    localStorage.removeItem('love_accepted');
  };

  const handleHeroBearClick = () => {
    const poses: BearPose[] = ['kissing', 'hugging', 'holding_heart', 'celebrating', 'shy_blush'];
    const nextPose = poses[(poses.indexOf(heroBearPose) + 1) % poses.length];
    setHeroBearPose(nextPose);
  };

  const isAr = config.language === 'ar';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/70 to-rose-100/60 text-slate-800 relative selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden font-cairo"
    >
      {/* Interactive Floating Hearts Canvas */}
      <FloatingHeartsCanvas interactive={true} />

      {/* Top Navbar / Header Controls */}
      <header className="sticky top-0 z-30 w-full px-4 py-3 backdrop-blur-md bg-white/70 border-b border-rose-100/80 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl animate-pulse-heart">🧸💕🧸</span>
            <span className="font-extrabold text-rose-600 text-sm sm:text-base font-cairo">
              {isAr ? 'دباديبنا' : 'Our Little World'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Replay Proposal Button */}
            {hasAcceptedProposal && (
              <button
                onClick={handleResetToProposal}
                title={isAr ? 'إعادة لعبة السؤال' : 'Replay Question'}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAr ? 'إعادة السؤال' : 'Replay'}</span>
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={() =>
                setConfig(prev => ({
                  ...prev,
                  language: prev.language === 'ar' ? 'en' : 'ar',
                }))
              }
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-700 text-xs font-bold transition-colors border border-rose-200 shadow-2xs cursor-pointer"
            >
              {config.language === 'ar' ? 'EN 🇬🇧' : 'عربي 🇪🇬'}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title={isAr ? 'تخصيص الأسماء والتواريخ' : 'Settings'}
              className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors border border-rose-200 shadow-2xs cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        {/* STAGE 1: Interactive Question Proposal */}
        <AnimatePresence mode="wait">
          {!hasAcceptedProposal ? (
            <motion.div
              key="proposal-stage"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="w-full flex justify-center py-6"
            >
              <QuestionProposal
                partnerName={config.partnerName}
                onAccepted={handleProposalAccepted}
                language={config.language}
              />
            </motion.div>
          ) : (
            /* STAGE 2: The Grand Romantic Experience */
            <motion.div
              key="main-romantic-experience"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full space-y-10"
            >
              {/* HERO SECTION: Animated Cute Bears & Main Quote */}
              <div className="p-8 sm:p-12 rounded-3xl romantic-glass romantic-glow text-center relative overflow-hidden">
                {/* Background soft ambient glows */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-rose-300/30 rounded-full blur-2xl pointer-events-none" />

                {/* Subtitle tag */}
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-bold mb-4 shadow-xs">
                  <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
                  {isAr ? `مهداة بحب لا ينتهي إلى ${config.partnerName}` : `Dedicated with endless love to ${config.partnerName}`}
                </span>

                {/* Interactive Bear Duo Display */}
                <div className="my-3 flex flex-col items-center justify-center">
                  <CuteBears
                    pose={heroBearPose}
                    size="xl"
                    interactive={true}
                    onInteract={handleHeroBearClick}
                    bubbleText={
                      isAr
                        ? ' 💖👫YOUSSEF & FATMA '
                        : ' YOUSSEF & FATMA👫💖 '
                    }
                  />
                  <span className="text-[11px] text-rose-400 font-semibold mt-1">
                    {isAr ? '👆 دوسي على الدباديب!' : '👆 Tap the bears for cute hugs, kisses & poses!'}
                  </span>
                </div>

                {/* Main Quote Title - As Requested by user */}
                <div className="mt-8 max-w-2xl mx-auto space-y-4">
                  <h1 className="font-script text-3xl sm:text-5xl font-extrabold text-rose-600 leading-tight tracking-wide drop-shadow-xs">
                    &ldquo;You are not just a name, you are a story I will never forget 💕&rdquo;
                  </h1>
                  <p className="text-slate-700 text-lg sm:text-2xl font-bold font-cairo leading-relaxed">
                    &ldquo;  أنتِ لستِ مجرد اسم.. أنتِ  القصه التي لن انساها  أبداً.&rdquo;
                  </p>
                </div>
              </div>

              {/* SECTION: Secret Romantic Letter */}
              <RomanticLetter
                partnerName={config.partnerName}
                senderName={config.senderName}
                language={config.language}
              />

              {/* SECTION: Love Counter Together */}
              <LoveCounter
                startDate={config.startDate}
                partnerName={config.partnerName}
                language={config.language}
              />

              {/* SECTION: Why I Love You Cards */}
              <ReasonsWhyILoveYou language={config.language} />

              {/* SECTION: Memory Photo Polaroid Gallery */}
              <MemoryGallery language={config.language} />

              {/* SECTION: Love Coupons & Promises */}
              <LoveCoupons language={config.language} />

              {/* SECTION: Secret Surprise Balloons */}
              <SecretBalloons language={config.language} />

              {/* Romantic Bottom Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-center shadow-xl space-y-3">
                <span className="text-3xl">🧸❤️🧸</span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-cairo">
                  {isAr ? 'كل سنه وانتي طيبه يا مزتي😚💕' : 'Every single day with you is a blessing'}
                </h3>
                <p className="text-rose-100 text-sm max-w-md mx-auto">
                  {isAr
                    ? 'شكراً لأنك أجمل نعمة في حياتي.. وجودك هو كل الي بتمناه دائماً وأبداً 💕'
                    : 'Thank you for being my favorite person in the entire world 💕'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-rose-400 font-medium relative z-10">
        <p className="flex items-center justify-center gap-1.5">
          <span>{isAr ? 'صُنع بكل حب خصيصاً لأجلها' : 'Crafted with endless love for her'}</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        </p>
      </footer>

      {/* Personalization & Settings Modal */}
      <PersonalizationModal
        config={config}
        onSave={newConfig => setConfig(newConfig)}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
