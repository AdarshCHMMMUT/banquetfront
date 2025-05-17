import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from "react-router-dom";

function LaganCalendar() {
  const [dates, setDates] = useState(null);
  const navigate = useNavigate();

  const isRangeSelected = dates && dates.length === 2 && dates[0] && dates[1];

  const handleBooking = () => {
    // Handle booking logic here
  };

  // Get auspicious dates for a specific year
  const getAuspiciousDates = (year) => {
    const format = (m, d) => `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return [
      format(1, 16), format(1, 17), format(1, 18), format(1, 19), format(1, 21), format(1, 22), format(1, 24), format(1, 25), format(1, 30),
      format(2, 3), format(2, 4), format(2, 6), format(2, 7), format(2, 13), format(2, 14), format(2, 15), format(2, 18), format(2, 19), format(2, 20), format(2, 21), format(2, 25),
      format(3, 1), format(3, 2), format(3, 3), format(3, 5), format(3, 6),
      format(4, 14), format(4, 16), format(4, 17), format(4, 18), format(4, 19), format(4, 20), format(4, 21), format(4, 22), format(4, 23), format(4, 25), format(4, 29), format(4, 30),
      format(5, 1), format(5, 5), format(5, 6), format(5, 7), format(5, 8), format(5, 10), format(5, 15), format(5, 17), format(5, 18), format(5, 19), format(5, 24), format(5, 28),
      format(6, 2), format(6, 4), format(6, 7), format(6, 8),
      format(7, 11), format(7, 12), format(7, 13), format(7, 17), format(7, 20), format(7, 21), format(7, 22), format(7, 26), format(7, 28), format(7, 29), format(7, 31),
      format(8, 1), format(8, 3), format(8, 4), format(8, 7), format(8, 8), format(8, 9), format(8, 13), format(8, 14), format(8, 17), format(8, 24), format(8, 25), format(8, 28), format(8, 29), format(8, 30), format(8, 31),
      format(9, 1), format(9, 2), format(9, 3), format(9, 4), format(9, 5), format(9, 26), format(9, 27), format(9, 28),
      format(10, 1), format(10, 2), format(10, 3), format(10, 4), format(10, 7), format(10, 8), format(10, 10), format(10, 11), format(10, 12), format(10, 22), format(10, 23), format(10, 24), format(10, 25), format(10, 26), format(10, 27), format(10, 28), format(10, 29), format(10, 30), format(10, 31),
      format(11, 2), format(11, 3), format(11, 4), format(11, 7), format(11, 8), format(11, 12), format(11, 13), format(11, 22), format(11, 23), format(11, 24), format(11, 25), format(11, 26), format(11, 27), format(11, 29), format(11, 30),
      format(12, 4), format(12, 5), format(12, 6),
    ];
  };

  // Check if a calendar day is auspicious
  const isAuspiciousDate = ({ day, month, year }) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const auspiciousDates = getAuspiciousDates(year);
    return auspiciousDates.includes(dateString);
  };

  // Highlight auspicious dates in the calendar
  const dateTemplate = (date) => {
    if (isAuspiciousDate(date)) {
      return (
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '50%',
          width: '2em',
          height: '2em',
          lineHeight: '2em',
          textAlign: 'center'
        }}>
          {date.day}
        </div>
      );
    }
    return <div>{date.day}</div>;
  };

  return (
    <div className="flex flex-col items-center">
      <Calendar
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        inline
        showWeek
        readOnlyInput
        className="w-full"
        dateTemplate={dateTemplate}
        viewDate={dates?.[0] || new Date()}
      />

      <button
        className={`py-2 w-[20%] text-white mt-4 ${
          isRangeSelected ? "bg-gradient-to-r from-sky-600 to-cyan-400" : "bg-gray-400"
        }`}
        disabled={!isRangeSelected}
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
}

export default LaganCalendar;
