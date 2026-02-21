export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getRamadanDay(today: string, ramadanStart: string) {
  const start = new Date(ramadanStart);
  const current = new Date(today);

  const diff =
    Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
    1;

  return diff > 0 ? diff : null;
}
