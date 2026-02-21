export function calculateDailyCompletion(tracker: any) {
  if (!tracker) {
    return {
      percentage: 0,
      completedCount: 0,
      total: 7,
    };
  }

  const checks = [
    tracker.prayed_fajr,
    tracker.prayed_dhuhr,
    tracker.prayed_asr,
    tracker.prayed_maghrib,
    tracker.prayed_isha,
    tracker.fasted,
    tracker.quran_pages > 0,
  ];

  const completedCount = checks.filter(Boolean).length;
  const total = checks.length;

  const percentage = Math.round((completedCount / total) * 100);

  return {
    percentage,
    completedCount,
    total,
  };
}

export function isDayCompleted(tracker: any) {
  return (
    tracker.fasted &&
    tracker.prayed_fajr &&
    tracker.prayed_dhuhr &&
    tracker.prayed_asr &&
    tracker.prayed_maghrib &&
    tracker.prayed_isha
  );
}
