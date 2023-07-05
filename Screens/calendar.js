import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    try {
      // Simulating API fetch
      const data = [
        { date: '2023-06-29', type: 'important', description: 'Bakrid/Eid ui-Adha' },
        {date: '2023-06-26', type: 'attendance', description: 'Present' },
        { date: '2023-06-24', type: 'attendance', description: 'Present' },
        { date: '2023-06-23', type: 'attendance', description: 'Absent' },
      ];

      setCalendarData(data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  const renderCalendarWithEvents = () => {
    const markedDates = {};

    calendarData.forEach((event) => {
      const { date, type, description } = event;

      let markColor = '#FF0000'; // Default color for events

      if (type === 'important') {
        markColor = '#FF0000'; // Custom color for important days
      } else if (type === 'attendance') {
        markColor = description === 'Present' ? '#00FF00' : '#FF0000'; // Green for 'Present', Red for 'Absent'
      }

      markedDates[date] = { selected: true, marked: true, dotColor: markColor, description };
    });

    return (
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          console.log('Selected date:', day.dateString);
        }}
      />
    );
  };

  const getAttendanceStatus = (date) => {
    const event = calendarData.find((event) => event.date === date);
    if (event && event.type === 'attendance') {
      return event.description;
    } else if (event && event.type === 'important') {
      return event.description;
    }
    return 'Normal day';
  };

  return (
    <View style={styles.container}>
      {renderCalendarWithEvents()}
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
        <Text style={styles.descriptionText}>Description: {getAttendanceStatus(selectedDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  selectedDateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default CalendarScreen;
