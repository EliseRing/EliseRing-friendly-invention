import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from './Icons';
import { Badge } from './ui/badge';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust to make Monday = 0

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return isSameDay(date, today);
  };

  const mockEvents = [
    { date: new Date(2025, 10, 6), title: 'Babysvømming', time: '10:00' },
    { date: new Date(2025, 10, 8), title: 'Babysang', time: '11:00' },
    { date: new Date(2025, 10, 12), title: 'Babymassasje', time: '13:00' },
  ];

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return mockEvents.filter(event => isSameDay(event.date, date));
  };

  const days = getDaysInMonth(currentDate);
  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen p-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4">Kalender</h1>
        <p className="text-gray-600">Planlegg dine aktiviteter</p>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={previousMonth}
            className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const hasEvents = day && getEventsForDate(day).length > 0;
            return (
              <button
                key={index}
                onClick={() => day && setSelectedDate(day)}
                disabled={!day}
                className={`
                  aspect-square rounded-2xl flex flex-col items-center justify-center relative
                  transition-all active:scale-95
                  ${!day ? 'invisible' : ''}
                  ${isSameDay(day, selectedDate) ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white' : 'bg-gray-50'}
                  ${isToday(day) && !isSameDay(day, selectedDate) ? 'border-2 border-teal-400' : ''}
                `}
              >
                {day && (
                  <>
                    <span className="text-sm">{day.getDate()}</span>
                    {hasEvents && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        isSameDay(day, selectedDate) ? 'bg-white' : 'bg-teal-500'
                      }`} />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events for Selected Date */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>
            {selectedDate.getDate()}. {monthNames[selectedDate.getMonth()]}
          </h3>
          <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white active:scale-95 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {selectedEvents.length > 0 ? (
          <div className="space-y-4">
            {selectedEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="mb-2">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                  <Badge className="bg-teal-500">Planlagt</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Ingen aktiviteter denne dagen</p>
            <p className="text-sm text-gray-400 mt-4">Trykk + for å legge til</p>
          </div>
        )}
      </div>
    </div>
  );
}
