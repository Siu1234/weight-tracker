import { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar({ entries, onSelectDay }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, otherMonth: true, date: null });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({ day: i, otherMonth: false, date: dateStr, hasEntry: !!entries[dateStr] });
  }

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, otherMonth: true, date: null });
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{MONTHS[month]} {year}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {DAYS.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`calendar-day ${d.otherMonth ? 'other-month' : ''} ${d.hasEntry ? 'has-entry' : ''}`}
            onClick={() => d.date && onSelectDay(d.date)}
          >
            {d.day}
            {d.hasEntry && entries[d.date]?.weight && (
              <span className="weight-dot">{entries[d.date].weight}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
