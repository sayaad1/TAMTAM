export type BearPose = 
  | 'idle'
  | 'holding_heart'
  | 'hugging'
  | 'kissing'
  | 'sad_plead'
  | 'celebrating'
  | 'shy_blush'
  | 'cuddling';

export interface CoupleConfig {
  partnerName: string;
  senderName: string;
  startDate: string; // YYYY-MM-DD
  mainQuoteEn: string;
  mainQuoteAr: string;
  loveLetter: string;
  musicEnabled: boolean;
  language: 'ar' | 'en';
}

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  tag?: string;
}

export interface LoveReason {
  id: number;
  textAr: string;
  textEn: string;
  iconName: string;
}

export interface LoveCoupon {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  redeemed: boolean;
}

export interface SecretNote {
  id: number;
  color: string;
  noteAr: string;
  noteEn: string;
  popped: boolean;
}
