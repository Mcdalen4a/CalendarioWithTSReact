import { useState } from 'react';
import { Calendar } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  time: string;
  color: string;
}

const events: Event[] = [
  { id: 1, title: 'Meeting', date: '2024-03-12', description: 'Team meeting', time: '10:00 AM', color: 'blue' },
  { id: 2, title: 'Birthday', date: '2024-03-15', description: 'John\'s birthday', time: '12:00 PM', color: 'green' },
  { id: 3, title: 'Project deadline', date: '2024-03-20', description: 'Project deadline', time: '5:00 PM', color: 'red' },
  { id: 4, title: 'Team lunch', date: '2024-03-12', description: 'Team lunch', time: '1:00 PM', color: 'orange' },
  { id: 5, title: 'Client meeting', date: '2024-03-18', description: 'Client meeting', time: '2:00 PM', color: 'purple' },
];

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState(events.filter(event => event.date === selectedDate.toISOString().split('T')[0]));

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvents(events.filter(event => event.date === date.toISOString().split('T')[0]));
  };

  const handleEventClick = (event: Event) => {
    alert(event.description);
  };

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-200';
      case 'green':
        return 'bg-green-200';
      case 'red':
        return 'bg-red-200';
      case 'orange':
        return 'bg-orange-200';
      case 'purple':
        return 'bg-purple-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <div className="flex items-center">
          <button className="p-2 bg-gray-200 rounded-l-lg" onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate()))}>&lt;</button>
          <button className="p-2 bg-gray-200 rounded-r-lg" onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()))}>&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className={`p-2 ${selectedDate.getDate() === day ? 'bg-blue-200' : ''} ${events.find(event => event.date === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString().split('T')[0]) ? getColorClass(events.find(event => event.date === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString().split('T')[0])!.color) : ''}`}>
            <span className="text-center block">{day}</span>
            {events.filter(event => event.date === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString().split('T')[0]).map(event => (
              <div key={event.id} className={`text-xs mt-2 ${getColorClass(event.color)}`} onClick={() => handleEventClick(event)}>{event.title} - {event.time}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Events</h2>
        <ul>
          {selectedEvents.map(event => (
            <li key={event.id} className={`py-2 border-b border-gray-200 ${getColorClass(event.color)}`} onClick={() => handleEventClick(event)}>{event.title} - {event.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarComponent;