import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Axios from 'axios';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

const classes = [
  { label: 'Class 5', value: 'Class 5' },
  { label: 'Class 6', value: 'Class 6' },
  { label: 'Class 7', value: 'Class 7' },
  { label: 'Class 8', value: 'Class 8' },
  { label: 'Class 9', value: 'Class 9' },
  { label: 'Class 10', value: 'Class 10' },
];

function HomeScreen({ route }) {
  const { classData } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Class {classData?.CLASS_NUMBER}</Text>
        <Text>Student Name: {classData?.Student_Name}</Text>
        <Text>Father Name: {classData?.Father_Name}</Text>
        <Text>Mother Name: {classData?.Mother_Name}</Text>
        <Text>Date of Birth: {classData?.Date_of_Birth}</Text>
        <Text>Mobile No: {classData?.Mobile_No}</Text>
        <Text>Email ID: {classData?.Email_id}</Text>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState('');
  const [studentData, setStudentData] = useState({});
  const navigation = useNavigation();

  const handleLogin = async () => {
    var admissionNumberRegex = /^[0-9]{4}$/;

    if (step === 1) {
      if (selectedClass.length === 0 || admissionNumber.length === 0 || emailId.length === 0) {
        Snackbar.show({
          text: 'Please select a class, enter your admission number, and provide your email address',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
      } else if (admissionNumberRegex.test(admissionNumber)) {
        try {
          const response = await Axios.post('http://192.168.43.112:8001/mailsent', {
            emailId: emailId,
          });

          if (response.data && response.data.success) {
            setStep(2);
          } else {
            Snackbar.show({
              text: 'Email ID not found for the given admission number',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: '#D82E2F',
            });
          }
        } catch (error) {
          console.error('Error:', error);
          console.log('Error Response:', error.response);
          handleAxiosError(error);
        }
      } else {
        Snackbar.show({
          text: 'Invalid admission number',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
      }
    }
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      console.error('Error Response:', error.response);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    Snackbar.show({
      text: 'Something went wrong, please try again',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#D82E2F',
    });
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await Axios.post('http://192.168.43.112:8001/otpreceive', {
        emailId: emailId,
        randomNum: otp,
      });

      if (response.status === 200) {
        Snackbar.show({
          text: 'Login Successful',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#242B2E',
        });
        setStep(3);
        setStudentData(response.data.student);
        navigation.replace('Home', { classData: response.data.student });
      } else {
        Snackbar.show({
          text: 'Invalid OTP, please try again',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#D82E2F',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      handleAxiosError(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>KNK Girls High School</Text>
          {step === 1 ? (
            <React.Fragment>
              <Picker
                style={styles.picker}
                selectedValue={selectedClass}
                onValueChange={(itemValue) => setSelectedClass(itemValue)}
              >
                <Picker.Item label="Select Class" value="" />
                {classes.map((className) => (
                  <Picker.Item key={className.value} label={className.label} value={className.value} />
                ))}
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Admission Number"
                onChangeText={(text) => setAdmissionNumber(text)}
                value={admissionNumber}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Email ID"
                onChangeText={(text) => setEmailId(text)}
                value={emailId}
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </React.Fragment>
          ) : step === 2 ? (
            <React.Fragment>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                onChangeText={(text) => setOtp(text)}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </React.Fragment>
          ) : step === 3 ? (
            <HomeScreen route={{ params: { classData: studentData } }} />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#242B2E',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
