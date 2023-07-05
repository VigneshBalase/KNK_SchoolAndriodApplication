import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

const StudentCard = ({ fullName, className, dob }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Name: {fullName}</Text>
      <Text style={styles.cardText}>Class: {className}</Text>
      <Text style={styles.cardText}>Date of Birth: {dob}</Text>
    </View>
  );
};   

const CustomCard = () => {
  const [students, setStudents] = useState([]);
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFullNameChange = (text) => {
    setFullName(text);
  };

  const handleClassNameChange = (text) => {
    setClassName(text);
  };

  const handleDobChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setDob(date);
    }
  };

  const handleSubmit = () => {
    const newStudent = {
      fullName: fullName,
      className: className,
      dob: dob,
    };
    setStudents([...students, newStudent]);
    setFullName('');
    setClassName('');
    setDob('');
  };

  useEffect(() => {
    if (showDatePicker) {
      // You can perform any necessary operations when the date picker is shown
    }
  }, [showDatePicker]);

  return (
    <View style={styles.container}>
      {students.map((student, index) => (
        <StudentCard
          key={index}
          fullName={student.fullName}
          className={student.className}
          dob={student.dob.toDateString()} // Convert the date to a string format
        />
      ))}

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Student Login</Text>

          <TextInput
            value={fullName}
            onChangeText={handleFullNameChange}
            placeholder="Full Name"
            style={styles.input}
          />

          <TextInput
            value={className}
            onChangeText={handleClassNameChange}
            placeholder="Class"
            style={styles.input}
          />

          {showDatePicker && (
            <DatePicker
              value={dob}
              mode="date"
              display="spinner"
              onChange={handleDobChange}
            />
          )}
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight:
    'bold',
    fontSize: 18,
    marginBottom: 10,
    },
    input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    padding: 5,
    marginBottom: 10,
    },
    datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    },
    dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
    },
    datePickerPlaceholder: {
    color: '#888',
    fontSize: 14,
    },
    datePickerText: {
    fontSize: 14,
    },
    cardActions: {
    alignItems: 'flex-end',
    },
    actionButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    },
    floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    },
    floatingButton: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    },
    floatingButtonIcon: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    },
    cardText: {
    fontSize: 16,
    marginBottom: 5,
    },
    });
    
    export default function App() {
    return (
    <View style={styles.container}>
    <CustomCard />
    </View>
    );
    }