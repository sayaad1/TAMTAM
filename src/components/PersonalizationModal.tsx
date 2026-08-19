import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Heart, User, Calendar, Languages, Check, Sparkles } from 'lucide-react';
import { CoupleConfig } from '../types';

interface PersonalizationModalProps {
  config: CoupleConfig;
  onSave: (newConfig: CoupleConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  config,
  onSave,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<CoupleConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const isAr = formData.language === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-6">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-lg font-cairo">
                <Settings className="w-5 h-5 text-rose-500" />
                <span>{isAr ? 'تخصيص الموقع وعبارات الحب' : 'Personalize Love Settings'}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Partner Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAr ? 'اسم حبيبتك / اللقب المفضل ليها:' : "Her Name / Nickname:"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.partnerName}
                    onChange={e => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full pr-9 pl-3 py-2 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:outline-none bg-rose-50/40 font-semibold text-slate-800"
                    placeholder="حبيبتي / My Princess"
                    required
                  />
                </div>
              </div>

              {/* Sender Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAr ? 'اسمك / إمضاؤك في الرسالة:' : "Your Name / Signature:"}
                </label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={e => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full pr-9 pl-3 py-2 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:outline-none bg-rose-50/40 font-semibold text-slate-800"
                    placeholder="حبيبك"
                    required
                  />
                </div>
              </div>

              {/* Anniversary Start Date */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAr ? 'تاريخ بداية الحكاية / أول يوم جمعكم:' : "Anniversary Date:"}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full pr-9 pl-3 py-2 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:outline-none bg-rose-50/40 text-slate-800"
                    required
                  />
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {isAr ? 'لغة العرض الأساسية:' : "Display Language:"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, language: 'ar' })}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                      formData.language === 'ar'
                        ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    العربية (Arabic)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, language: 'en' })}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                      formData.language === 'en'
                        ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Save Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-rose-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-md shadow-rose-300/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'حفظ التغييرات ✨' : 'Save Changes ✨'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
