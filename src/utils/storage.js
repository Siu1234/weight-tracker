const STORAGE_KEY = 'weight-tracker-data';

export const getEntries = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveEntry = (entry) => {
  const entries = getEntries();
  entries[entry.date] = entry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entries;
};

export const deleteEntry = (date) => {
  const entries = getEntries();
  delete entries[date];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entries;
};

export const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export const getWeekDates = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

export const getWeeklyAverages = (entries) => {
  const weeks = {};
  Object.entries(entries).forEach(([date, entry]) => {
    if (entry.weight) {
      const weekKey = `${new Date(date).getFullYear()}-W${getWeekNumber(date)}`;
      if (!weeks[weekKey]) {
        weeks[weekKey] = { total: 0, count: 0, dates: [] };
      }
      weeks[weekKey].total += parseFloat(entry.weight);
      weeks[weekKey].count += 1;
      weeks[weekKey].dates.push(date);
    }
  });
  return Object.entries(weeks)
    .map(([week, data]) => ({
      week,
      average: (data.total / data.count).toFixed(1),
      count: data.count,
    }))
    .sort((a, b) => b.week.localeCompare(a.week));
};
