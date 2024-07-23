export function getLastFiveYears() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i <= 5; i++) {
    years.push((currentYear - i).toString());
  }

  return years.sort();
}
