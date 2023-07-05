import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [calendarData, setCalendarData] = useState([]);

  // Fetch calendar data including holidays and important days from an API or local storage
  // useEffect(() => {
  //   fetchCalendarData();
  // }, []);

  // const fetchCalendarData = async () => {
  //   try {
  //     // Fetch calendar data from API or local storage
  //     // Replace the API endpoint or storage retrieval with your own implementation

  //     // Example API endpoint for calendar data
  //     const response = await fetch('https://api.example.com/calendar');
  //     const data = await response.json();

  //     // Update the 'calendarData' state with the fetched data
  //     setCalendarData(data);
  //   } catch (error) {
  //     console.error('Error fetching calendar data:', error);
  //   }
  // };

  const renderCalendarWithEvents = () => {
    // Generate marked dates with event details for the Calendar component
    const markedDates = {};

    calendarData.forEach((event) => {
      const { date, type, description } = event;

      // Customize the mark color based on the event type (e.g., holiday, important day)
      let markColor = '#FF0000'; // Default color for holidays

      if (type === 'important') {
        markColor = '#00FF00'; // Custom color for important days
      }

      markedDates[date] = { selected: true, marked: true, dotColor: markColor, description };
    });

    return (
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => console.log('Selected date:', day.dateString)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderCalendarWithEvents()}
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>Selected Date:</Text>
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
});

export default CalendarScreen;
