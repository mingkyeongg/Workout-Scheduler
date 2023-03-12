import React, { useState, useEffect } from 'react';
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import axios from 'axios';

const MyCalendar = () => {

  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/calendar-events/')
      .then((response) => {
        setEvents([...response.data]);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      setEvents([...storedEvents]);
  }, []);

  const container = React.useRef();

  useEffect(() => {
    const options = {
      defaultView: 'month',
      useCreationPopup: true,
      useDetailPopup: true,
    };

    const calendar = new Calendar(container.current, options);

    calendar.setCalendars([
      {
        id: 'climbing',
        name: '클라이밍',
        color: '#ffffff',
        bgColor: '#ff5583',
        dragBgColor: '#ff5583',
        borderColor: '#ff5583',
      },
      {
        id: 'Meeting',
        name: '모임',
        color: '#ffffff',
        bgColor: '#ffbb3b',
        dragBgColor: '#ffbb3b',
        borderColor: '#ffbb3b',
      },
      {
        id: 'work',
        name: '기타 운동',
        color: '#ffffff',
        bgColor: '#03bd9e',
        dragBgColor: '#03bd9e',
        borderColor: '#03bd9e',
      },
    ]);

    calendar.on('beforeCreateSchedule', scheduleData => {
      const schedule = {
        calendarId: scheduleData.calendarId,
        id: Math.random() * 100000000000000000,
        title: scheduleData.title,
        isAllDay: scheduleData.isAllDay,
        start: scheduleData.start,
        end: scheduleData.end,
        category: scheduleData.isAllDay ? 'allday' : 'time',
        location: scheduleData.location
      };

      axios.post('http://localhost:8000/api/calendar-events/', {
        id : schedule.id,
        title : schedule.title,
        start : String(schedule.start),
        end : String(schedule.end),
        location : schedule.location,
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

        console.log(schedule);

      const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
      schedules.push(schedule);
      localStorage.setItem('schedules', JSON.stringify(schedules));

      alert('일정 생성 완료');
      calendar.createSchedules([schedule]);
    });

    calendar.on('beforeUpdateSchedule', event => {
      const {schedule, changes} = event;

      axios.put(`http://localhost:8000/api/calendar-events/${schedule.id}/`, changes)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        const index = storedEvents.findIndex(item => item.id === schedule.id);
        storedEvents[index] = {...storedEvents[index], ...changes};
        localStorage.setItem('events', JSON.stringify(storedEvents));

      calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });

    calendar.on('beforeDeleteSchedule', scheduleData => {
      const {schedule} = scheduleData;

      axios.delete(`http://localhost:8000/api/calendar-events/${schedule.id}/`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      const index = storedEvents.findIndex(item => item.id === schedule.id);
      storedEvents.splice(index, 1);
      localStorage.setItem('events', JSON.stringify(storedEvents));

      calendar.deleteSchedule(schedule.id, schedule.calendarId);
    });

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div>
      <button id="prevBtn" >이전</button>
      <button id="nextBtn">다음</button>
      <button id="dayViewBtn">일간</button>
      <button id="weekViewBtn">주간</button>
      <button id="monthViewBtn">월간</button>
      <div ref={container} />
    </div>
  );
};

export default MyCalendar;
