import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text style={styles.emptyDateText}>No events found for this date</Text>
      </View>
    );
  };

  const renderEvent = (event) => {
    return (
      <TouchableOpacity style={styles.eventContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventTime}>{event.time}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderDay = (day, item) => {
    if (!item || item.length === 0) {
      return renderEmptyDate();
    } else {
      return (
        <View style={styles.dayContainer}>
          {item.map((day, index) => (
            <View key={index} style={styles.dayEventContainer}>
              {renderEvent(day)}
            </View>
          ))}
        </View>
      );
    }
  };

  const events = {
    '2023-06-29': [
      {
        title: 'Maths Class',
        time: '9:00 AM - 10:00 AM',
        description: 'Room: 101',
      },
      {
        title: 'Science Lab',
        time: '10:30 AM - 12:00 PM',
        description: 'Room: Lab 1',
      },
    ],
    '2023-06-30': [
      {
        title: 'English Literature',
        time: '9:00 AM - 10:00 AM',
        description: 'Room: 201',
      },
      {
        title: 'Physics Class',
        time: '10:30 AM - 12:00 PM',
        description: 'Room: 102',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
      />
      {selectedDate && (
        <Agenda
          items={events}
          selected={selectedDate}
          renderItem={renderDay}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  emptyDateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyDateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  dayEventContainer: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  eventContainer: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default CalendarScreen;
