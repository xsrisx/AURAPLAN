import { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const [markedDays, setMarkedDays] = useState([]);

  const markToday = () => {
    const today = new Date().getDate();
    if (!markedDays.includes(today)) {
      setMarkedDays([...markedDays, today]);
    }
  };

  return (
    <div className="calendar-container">
      <h3>Study Calendar 📅</h3>
      <button onClick={markToday}>Mark Today</button>

      <div className="calendar-grid">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className={`calendar-day ${
              markedDays.includes(i + 1)
                ? "marked"
                : ""
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
