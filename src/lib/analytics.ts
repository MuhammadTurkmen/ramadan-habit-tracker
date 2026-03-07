import { getLocalDateString, getRamadanDay } from "./date";
import { isDayCompleted } from "./tracker-utils";
import { Tracker } from "./types";

const today = getLocalDateString();
const ramadanStart = process.env.RAMADAN_START_DATE!;
const QURAN_TOTAL_PAGES = 604;
const RAMADAN_TOTAL_DAYS = 30;

export function buildInsights(trackers: Tracker[]) {
  const totalDays = trackers.length;

  // fasting days
  const fastingDays = trackers.filter((d) => d.fasted).length;

  // total quran
  const totalQuranPages = trackers.reduce(
    (sum, d) => sum + (d.quran_pages || 0),
    0,
  );

  const averageDaily =
    totalDays > 0 ? Math.round(totalQuranPages / totalDays) : 0;

  // prayer counters
  const prayerTotals = {
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  };

  trackers.forEach((d) => {
    if (d.prayed_fajr) prayerTotals.Fajr++;
    if (d.prayed_dhuhr) prayerTotals.Dhuhr++;
    if (d.prayed_asr) prayerTotals.Asr++;
    if (d.prayed_maghrib) prayerTotals.Maghrib++;
    if (d.prayed_isha) prayerTotals.Isha++;
  });

  const prayerConsistency = Object.entries(prayerTotals).map(
    ([prayer, completed]) => ({
      prayer,
      completed,
      total: totalDays,
    }),
  );

  // weekly chart
  const weeklyData = trackers.slice(-7).map((d) => {
    const prayersCompleted =
      Number(d.prayed_fajr) +
      Number(d.prayed_dhuhr) +
      Number(d.prayed_asr) +
      Number(d.prayed_maghrib) +
      Number(d.prayed_isha);

    const completion = Math.round((prayersCompleted / 5) * 100);

    return {
      day: new Date(d.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      completion,
      prayers: prayersCompleted,
      quran: d.quran_pages,
    };
  });

  // -------- STREAKS --------

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  trackers.forEach((d) => {
    const active =
      d.fasted &&
      d.quran_pages > 0 &&
      d.prayed_fajr &&
      d.prayed_dhuhr &&
      d.prayed_asr &&
      d.prayed_maghrib &&
      d.prayed_isha;

    if (active) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  for (let i = trackers!.length - 1; i >= 0; i--) {
    const t = trackers![i];

    // Ignore future days
    if (new Date(t.date) > new Date(today)) continue;

    // Ignore today if not completed
    if (t.date === today && !isDayCompleted(t)) {
      continue;
    }

    if (isDayCompleted(t)) {
      currentStreak++;
    } else {
      break;
    }
  }

  // overall completion %
  const totalPossiblePrayers = totalDays * 5;

  const totalPrayers =
    prayerTotals.Fajr +
    prayerTotals.Dhuhr +
    prayerTotals.Asr +
    prayerTotals.Maghrib +
    prayerTotals.Isha;

  const averageCompletion =
    totalPossiblePrayers > 0
      ? Math.round((totalPrayers / totalPossiblePrayers) * 100)
      : 0;

  // Quran completion target based on current Ramadan progress
  const currentRamadanDay = getRamadanDay(today, ramadanStart);
  const remainingPages = Math.max(QURAN_TOTAL_PAGES - totalQuranPages, 0);

  const daysLeft =
    currentRamadanDay === null
      ? RAMADAN_TOTAL_DAYS
      : Math.max(RAMADAN_TOTAL_DAYS - currentRamadanDay, 0);

  const pagesPerDayNeeded =
    remainingPages === 0
      ? 0
      : daysLeft > 0
        ? Math.ceil(remainingPages / daysLeft)
        : remainingPages;

  return {
    totalDays,
    fastingDays,
    totalQuranPages,
    averageDaily,
    prayerConsistency,
    weeklyData,
    currentStreak,
    longestStreak,
    averageCompletion,
    currentRamadanDay,
    daysLeft,
    remainingPages,
    pagesPerDayNeeded,
  };
}
