import { isHalloweenSeason } from "./halloween-season.js";

/* Navidad en hora local: 1 de diciembre 00:00 → 6 de enero 23:59. */
export function isChristmasSeason(date) {
  const month = date.getMonth();
  const minuteOfDay = date.getHours() * 60 + date.getMinutes();

  if (month === 11) return date.getDate() >= 1;
  if (month !== 0) return false;
  if (date.getDate() < 6) return true;
  if (date.getDate() > 6) return false;
  return minuteOfDay <= 23 * 60 + 59;
}

/* Un solo efecto a la vez: los previews de la URL mandan, Navidad gana si
   piden los dos, y fuera de temporada no hay decoración. */
export function getSeasonalEffect(date, params) {
  if (params.has("snow")) return "snow";
  if (params.has("halloween")) return "halloween";
  if (isChristmasSeason(date)) return "snow";
  if (isHalloweenSeason(date)) return "halloween";
  return null;
}
