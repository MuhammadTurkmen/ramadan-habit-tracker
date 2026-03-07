export type Tracker = {
  id: number;
  user_id: string;
  date: string;

  prayed_fajr: boolean;
  prayed_dhuhr: boolean;
  prayed_asr: boolean;
  prayed_maghrib: boolean;
  prayed_isha: boolean;

  fasted: boolean;
  quran_pages: number;
};
