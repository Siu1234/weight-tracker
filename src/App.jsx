import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import DayModal from './components/DayModal';
import Sidebar from './components/Sidebar';
import { getEntries, saveEntry, deleteEntry } from './utils/storage';
import './App.css';

function App() {
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const handleSave = (entry) => {
    const updated = saveEntry(entry);
    setEntries(updated);
    setSelectedDate(null);
  };

  const handleDelete = (date) => {
    const updated = deleteEntry(date);
    setEntries(updated);
    setSelectedDate(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weight Tracker</h1>
      </header>
      <div className="app-content">
        <Calendar entries={entries} onSelectDay={setSelectedDate} />
        <Sidebar entries={entries} />
      </div>
      {selectedDate && (
        <DayModal
          date={selectedDate}
          entry={entries[selectedDate]}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

export default App;
