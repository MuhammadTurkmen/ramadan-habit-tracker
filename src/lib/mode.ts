export type Mode = "ramadan" | "normal";

export function getMode(): Mode {
  // later you can make this dynamic (settings, date, etc.)
  const mode = process.env.APP_MODE;

  if (mode === "ramadan") return "ramadan";
  return "normal";
}
