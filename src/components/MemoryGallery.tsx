import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, Trash2, Heart, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { romanticAudio } from '../utils/romanticAudio';

interface MemoryGalleryProps {
  language: 'ar' | 'en';
}

const initialPhotos: MemoryPhoto[] = [
  {
    id: '1',
    url: 'images/photo_2026-08-19_15-09-23.jpg',
    caption: 'أجمل وأرق صدفة جمعتنا سوا ✨',
    tag: 'بداية الحكاية',
  },
   {
    id: '2',
    url: 'images/photo_2026-08-19_16-26-32.jpg',
    caption: 'معاكي الوقت مش بيعدي… الوقت بيتعاش 💕✨',
    
  },
   {
    id: '3',
    url: 'images/photo_2026-08-19_15-21-08.jpg',
    caption: 'فيكي لقيت المكان اللي قلبي كان بيدور عليه💕',
    
  },
   {
    id: '4',
    url: 'images/photo_2026-08-19_15-09-19.jpg',
    caption: 'مش مهم فين، المهم إنك جنبي ✨',
    
  },
  {
    id: '5',
    url: 'images/photo_2026-08-19_15-12-57.jpg',
    caption: 'كل لحظة بتعدي جنبك هي عمري الحقيقي 💕',
    
  },
  {
    id: '6',
    url: 'images/photo_2026-08-19_15-23-49.jpg',
    caption: 'حكاية مكملة لآخر العمر إن شاء الله 🌸',
    
  },
];

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ language }) => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const isAr = language === 'ar';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newPhoto: MemoryPhoto = {
      id: Date.now().toString(),
      url: newUrl,
      caption: newCaption.trim() || (isAr ? 'ذكرى خاصة محفورة في القلب 💕' : 'A special memory in my heart 💕'),
      tag: isAr ? 'ذكرى جديدة' : 'New Memory',
    };

    setPhotos(prev => [newPhoto, ...prev]);
    setNewUrl('');
    setNewCaption('');
    setIsAdding(false);
    romanticAudio.playCelebrationChime();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="my-10">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-1">
            <Camera className="w-3.5 h-3.5 text-rose-500" />
            {isAr ? 'ألبوم ذكرياتنا  ' : 'Our Memory Album'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-cairo">
            {isAr ? 'لحظات لا تُنسى 📸' : 'Unforgettable Moments 📸'}
          </h3>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-rose-300/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة صورة / ذكرى جديدة' : 'Add Photo / Memory'}</span>
        </button>
      </div>

      {/* Add Memory Drawer/Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddMemory}
            className="mb-6 p-5 rounded-2xl romantic-glass border border-rose-200 overflow-hidden space-y-3"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-700">
              <span>{isAr ? 'إضافة صورة جديدة للألبوم' : 'Add New Photo to Album'}</span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {isAr ? 'رفع صورة من جهازك:' : 'Upload from device:'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {isAr ? 'أو رابط صورة مباشرة:' : 'Or direct Image URL:'}
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-rose-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isAr ? 'العبارة أو الذكرى المكتوبة تحتها:' : 'Caption / Memory note:'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'مثلاً: يوم ما اتمشينا سوا تحت المطر 💕' : 'E.g., The day we walked in the rain 💕'}
                value={newCaption}
                onChange={e => setNewCaption(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-rose-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={!newUrl.trim()}
                className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {isAr ? 'حفظ الذكرى ✨' : 'Save Memory ✨'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => {
          const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];
          const rotClass = rotations[index % rotations.length];

          return (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03, rotate: 0, y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                romanticAudio.playHeartPop();
                setSelectedPhoto(photo);
              }}
              className={`p-3 pb-5 bg-white rounded-2xl shadow-lg border border-slate-100 cursor-pointer transition-all duration-300 ${rotClass} relative group`}
            >
              {/* Cute Washi Tape effect on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-rose-200/80 rounded-xs -rotate-2 shadow-2xs pointer-events-none z-10" />

              {/* Photo Frame */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {photo.tag && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                    {photo.tag}
                  </span>
                )}
              </div>

              {/* Polaroid Caption */}
              <p className="text-center font-cairo text-sm font-semibold text-slate-700 px-2 line-clamp-2">
                {photo.caption}
              </p>

              {/* Delete button on hover for customized items */}
              {photos.length > 1 && (
                <button
                  onClick={e => handleDelete(photo.id, e)}
                  title="Remove"
                  className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 hover:bg-rose-50 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-4/3 mb-4 bg-slate-100">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-slate-800 font-cairo mb-1">
                {selectedPhoto.caption}
              </h4>
              <p className="text-rose-500 text-xs font-semibold">
                {isAr ? 'ذكرى محفورة في القلب إلى الأبد 💕' : 'A memory etched in my heart forever 💕'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
