import { useMemo } from 'react';
import { getWeeklyAverages } from '../utils/storage';

export default function Sidebar({ entries }) {
  const weeklyAverages = useMemo(() => getWeeklyAverages(entries), [entries]);

  const currentWeek = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-W${Math.ceil(((now - new Date(now.getFullYear(), 0, 1)) / 86400000 + 1 + 3) / 7)}`;
  }, []);

  return (
    <div className="sidebar">
      <h2>Weekly Averages</h2>
      {weeklyAverages.length === 0 ? (
        <p className="no-data">No weight data yet. Start tracking!</p>
      ) : (
        <div className="weekly-list">
          {weeklyAverages.map(({ week, average, count }) => (
            <div key={week} className={`week-item ${week === currentWeek ? 'current' : ''}`}>
              <span className="week-label">{week}</span>
              <span className="week-average">{average} kg</span>
              <span className="week-count">{count} days</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
