import { useState, useEffect } from 'react';

const emptyEntry = {
  weight: '',
  lunch: '',
  dinner: '',
  supplements: '',
  snacks: '',
  calories: '',
  carbs: '',
  fats: '',
  proteins: '',
};

export default function DayModal({ date, entry, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(emptyEntry);

  useEffect(() => {
    if (entry) {
      setForm({
        weight: entry.weight || '',
        lunch: entry.lunch || '',
        dinner: entry.dinner || '',
        supplements: entry.supplements || '',
        snacks: entry.snacks || '',
        calories: entry.calories || '',
        carbs: entry.carbs || '',
        fats: entry.fats || '',
        proteins: entry.proteins || '',
      });
    } else {
      setForm(emptyEntry);
    }
  }, [entry, date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, ...form });
  };

  const handleDelete = () => {
    if (confirm('Delete this entry?')) {
      onDelete(date);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{date}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" step="0.1" name="weight" value={form.weight} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Lunch</label>
            <textarea name="lunch" value={form.lunch} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Dinner</label>
            <textarea name="dinner" value={form.dinner} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Supplements</label>
            <textarea name="supplements" value={form.supplements} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Snacks</label>
            <textarea name="snacks" value={form.snacks} onChange={handleChange} />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Calories</label>
              <input type="number" name="calories" value={form.calories} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Carbs (g)</label>
              <input type="number" name="carbs" value={form.carbs} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Fats (g)</label>
              <input type="number" name="fats" value={form.fats} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Proteins (g)</label>
              <input type="number" name="proteins" value={form.proteins} onChange={handleChange} />
            </div>
          </div>
          
          <div className="modal-actions">
            {entry && <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>}
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
