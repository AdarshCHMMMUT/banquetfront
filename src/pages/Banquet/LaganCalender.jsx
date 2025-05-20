import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function LaganCalendar() {
  const [dates, setDates] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [month, setMonth] = useState(4); // May = 4 (0-indexed)
  const [year, setYear] = useState(2025);

  const navigate = useNavigate();

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setHoveredDate(null); // Clear hover state
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const handleBooking = () => {
  if (selectedRange.start && selectedRange.end) {
    navigate(`/book?start=${selectedRange.start}&end=${selectedRange.end}`);
  } else if (selectedDate) {
    navigate(`/book/${selectedDate}`);
  }
};

  const format = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

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

  const auspiciousDates = new Set(getAuspiciousDates(year));

  const getDateCategory = (date) => {
    const heavyDates = new Set(Array.from(auspiciousDates).filter(d => [1, 5, 10, 15, 20, 25, 30].includes(parseInt(d.split('-')[2]))));
    const mediumDates = new Set(Array.from(auspiciousDates).filter(d => [2, 4, 7, 9, 17, 22, 27].includes(parseInt(d.split('-')[2]))));
    if (heavyDates.has(date)) return 'heavy';
    if (mediumDates.has(date)) return 'medium';
    if (auspiciousDates.has(date)) return 'light';
    return null;
  };

  const getTooltipText = (category) => {
    if (category === 'heavy') return 'Heavy Booking';
    if (category === 'medium') return 'Medium Booking';
    if (category === 'light') return 'Light Booking';
    return '';
  };

  const dateTemplate = ({ year, month, day }) => {
  const currentDate = format(year, month, day);
  const category = getDateCategory(currentDate);

  let bgColor = '';
  if (category === 'heavy') bgColor = '#10b981'; // Green
  else if (category === 'medium') bgColor = '#fde68a'; // Yellow
  else if (category === 'light') bgColor = '#fe2f32'; // Orange

  const isStart = selectedRange.start === currentDate;
  const isEnd = selectedRange.end === currentDate;
  const isInRange = selectedRange.start && selectedRange.end && (
    new Date(currentDate) > new Date(selectedRange.start) &&
    new Date(currentDate) < new Date(selectedRange.end)
  );
  const isSingleSelected = selectedDate === currentDate && !selectedRange.start && !selectedRange.end;

  const highlightClass = isStart || isEnd || isSingleSelected
    ? 'border-4 border-blue-500'
    : isInRange
    ? 'ring-2 ring-blue-300'
    : '';

  return (
  <div
      className={`w-9 h-10 md:w-12 md:h-12 relative ${highlightClass}`}
      style={{ backgroundColor: bgColor }}
      onClick={() => {
        if (!selectedRange.start && !selectedRange.end) {
          setSelectedDate(currentDate);
          setSelectedRange({ start: currentDate, end: null });
        } else if (selectedRange.start && !selectedRange.end) {
          const start = new Date(selectedRange.start);
          const end = new Date(currentDate);
          if (end > start) {
            setSelectedRange({ ...selectedRange, end: currentDate });
          } else {
            setSelectedRange({ start: currentDate, end: null });
            setSelectedDate(currentDate);
          }
        } else {
          setSelectedDate(currentDate);
          setSelectedRange({ start: currentDate, end: null });
        }
      }}
      onMouseEnter={() => setHoveredDate(currentDate)}
      onMouseLeave={() => setHoveredDate(null)}
      title={getTooltipText(category)}
    >
      <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base">
        {day}
      </span>
    </div>
  );
};




const renderCalendar = () => {
  const weeks = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let day = 1;

  for (let week = 0; week < 6; week++) {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const cellIndex = week * 7 + i;

      if (cellIndex < firstDay || day > daysInMonth) {
        days.push(
          <td key={i} className="h-20 align-top text-center">
            {/* Empty */}
          </td>
        );
      } else {
        const cellContent = dateTemplate({ year, month, day });
        days.push(
   <td key={i} className="h-12 md:h-16 p-1">
  <div className="h-full flex items-center justify-center">
    {cellContent}
  </div>
</td> 
        );
        day++;
      }
    }

    // ❌ Skip pushing this row if all 7 cells are empty
    const isRowEmpty = days.every(cell => !cell.props.children || cell.props.children.props === undefined);

    if (!isRowEmpty) {
      weeks.push(<tr key={week}>{days}</tr>);
    }
  }

  return weeks;
};




  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
      <div ref={calendarRef} className="p-2 md:p-6 text-center max-w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-2 md:mb-4">
        <button 
          onClick={handlePrev} 
          className="bg-gradient-to-r from-[#5e0d14] to-[#991e1e] text-white px-2 py-1 md:px-4 md:py-2 rounded text-sm md:text-base"
        >
          Previous
        </button>
        <h2 className="text-sm md:text-xl font-semibold mx-2">{`${monthNames[month]} ${year}`}</h2>
        <button 
          onClick={handleNext} 
          className="bg-gradient-to-r from-[#5e0d14] to-[#991e1e] text-white px-2 py-1 md:px-4 md:py-2 rounded text-sm md:text-base"
        >
          Next
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full max-w-full border-collapse">
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th key={day} className="h-8 md:h-12 bg-gray-100 text-xs md:text-sm">
                  {day.substring(0, 1)}
                  <span className="hidden sm:inline">{day.substring(1)}</span>
                </th>
              ))}
            </tr>
          </thead>
        <tbody className="align-top">{renderCalendar()}</tbody>
        </table>
      </div>

      <div className="mt-2 md:mt-4 flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm">
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: '#fe2f32' }}></span>
          <span>Light Booking</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: '#fde68a' }}></span>
          <span>Medium Booking</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: '#10b981' }}></span>
          <span>Heavy Booking</span>
        </div>
      </div>

      <button
        className={`py-1 px-6 md:py-2 md:px-12 mt-3 md:mt-6 text-white rounded text-sm md:text-base ${
          selectedRange.start ? 'bg-gradient-to-r from-[#5e0d14] to-[#991e1e]' : 'bg-gray-400'
        }`}
        disabled={!selectedDate && (!selectedRange.start || !selectedRange.end)}
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
}

export default LaganCalendar;
