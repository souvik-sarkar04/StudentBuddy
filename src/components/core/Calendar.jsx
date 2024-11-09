// src/components/Calendar.jsx
import React, { useState, useEffect } from 'react';
// import Modal from './Modal';



const Calendar = ({form, setForm}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  ];


  const classNames = (...Class)=>{
	return Class.filter(Boolean).join(' ');
  }

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const calendarDays = [];

    // Create empty boxes for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null); // Empty days before the 1st of the month
    }

    // Create days for the current month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const dates = new Date(currentYear, currentMonth, day);
    
	//console.log("hi:" + formattedDate)
    setForm({...form, date:dates});
  };

  const calendarDays = generateCalendar(currentYear, currentMonth);

  return (
    // <div className="flex items-center justify-center h-1/2">
      <div className="w-full mx-auto px-3 md:my-10 my-3">
        <div className="bg-gray-600 shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-blue-500">
            <button onClick={handlePrevMonth} className="text-white">Previous</button>
            <h2 id="currentMonth" className="text-white">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
            <button onClick={handleNextMonth} className="text-white">Next</button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold">{day}</div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => day && handleDateClick(day)}
                className={classNames(`text-center py-1 border border-gray-800 text-gray-400 rounded-full active:bg-red-600 hover:bg-gray-300 hover:text-gray-600 cursor-pointer ${day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()? 'bg-blue-500 text-white' : ''}`)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      {/* </div> */}

      {/* {selectedDate && <Modal date={selectedDate} onClose={() => setSelectedDate(null)} />} */}
	  {/* {console.log(selectedDate)} */}
    </div>
  );
};

export default Calendar;

