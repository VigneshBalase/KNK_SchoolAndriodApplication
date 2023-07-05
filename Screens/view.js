import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timetable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Fetch timetable data from MongoDB database
    fetchTimetableData();

    // Update the timetable every day at midnight
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute for demonstration purposes. You can adjust the interval as needed.

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchTimetableData = async () => {
    try {
      // Perform API request to fetch timetable data
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setTimetableData(data);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  const currentDay = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
  const filteredTimetableData = timetableData.filter((item) => item.day === currentDay);

  const availableTimeSlots = Array.from({ length: 8 }, (_, index) => index + 1);

  // Exclude time slots without any classes
  const filteredTimeSlots = availableTimeSlots.filter((slot) =>
    filteredTimetableData.some((item) => item.timeSlot === slot)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate.toDateString()}</Text>
      <Text style={styles.day}>{currentDay}</Text>
      {filteredTimeSlots.map((slot) => (
        <View key={slot} style={styles.subjectContainer}>
          <Text style={styles.subjectName}>
            {filteredTimetableData.find((item) => item.timeSlot === slot)?.subject || 'No Class'}
          </Text>
          <Text style={styles.time}>Time Slot {slot}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 14,
    marginBottom: 8,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectContainer: {
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
  },
});

export default Timetable;
