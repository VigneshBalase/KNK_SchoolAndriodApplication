import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import Snackbar from 'react-native-snackbar'; // Import the snackbar

const CalendarScreen = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://192.168.43.112:8001/teacher/attendanceupdate/read');
      const data = response.data;
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const renderCalendarWithEvents = () => {
    const markedDates = {};

    attendanceData.forEach((attendanceRecord) => {
      const { date, className: selectedClass, absentNames } = attendanceRecord;

      const formattedDate = date.slice(0, 10); // Extracting only the date part (YYYY-MM-DD)

      let markedData = {
        selected: true,
        marked: true,
        selectedColor: '#FF5733', // Default color for absent students
        class: selectedClass,
        absentNames: absentNames.join(', '),
      };

      // Check if Veena B Sankappanavar is present or absent on this date
      if (absentNames.includes('Veena B Sankappanavar')) {
        markedData.selectedColor = '#FF5733'; // Red for absent
      } else {
        markedData.selectedColor = '#00FF00'; // Green for present
      }

      markedDates[formattedDate] = markedData;
    });

    return (
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          console.log('Selected date:', day.dateString);
          const attendanceRecord = markedDates[day.dateString];
          if (attendanceRecord.absentNames.length > 0) {
            console.log('Absent students:', attendanceRecord.absentNames);
          } else {
            console.log('All students present.');
          }

          // Show snackbar message for Veena B Sankappanavar's attendance status
          if (attendanceRecord.absentNames.includes('Veena B Sankappanavar')) {
            Snackbar.show({
              text: 'Veena B Sankappanavar is absent on this date.',
              duration: Snackbar.LENGTH_LONG,
            });
          } else {
            Snackbar.show({
              text: 'Veena B Sankappanavar is present on this date.',
              duration: Snackbar.LENGTH_LONG,
            });
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderCalendarWithEvents()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
});

export default CalendarScreen;
