export function isHalloweenSeason(date) {
  const month = date.getMonth();
  const day = date.getDate();

  return (month === 9 && day >= 24) || (month === 10 && day <= 1);
}
