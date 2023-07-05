import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Button, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleCalendarSyncToggle = () => {
    setCalendarSyncEnabled(!calendarSyncEnabled);
  };

  const handleHelpSupport = () => {
    // Add your help/support logic here
    console.log('Help/Support');
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout');
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <View style={darkModeEnabled ? styles.containerDark : styles.container}>
      <View style={darkModeEnabled ? styles.sectionDark : styles.section}>
        <Text style={darkModeEnabled ? styles.sectionTitleDark : styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingRow}>
          <Text>Enable Notifications</Text>
          <Switch value={notificationEnabled} onValueChange={handleNotificationToggle} />
        </View>
      </View>
      <View style={darkModeEnabled ? styles.sectionDark : styles.section}>
        <Text style={darkModeEnabled ? styles.sectionTitleDark : styles.sectionTitle}>Language Settings</Text>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => handleLanguageChange('Kannada')}
        >
          <Text>Kannada</Text>
          <Text>{language === 'Kannada' ? 'Selected' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => handleLanguageChange('Hindi')}
        >
          <Text>Hindi</Text>
          <Text>{language === 'Hindi' ? 'Selected' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => handleLanguageChange('English')}
        >
          <Text>English</Text>
          <Text>{language === 'English' ? 'Selected' : ''}</Text>
        </TouchableOpacity>
      </View>
      <View style={darkModeEnabled ? styles.sectionDark : styles.section}>
        <Text style={darkModeEnabled ? styles.sectionTitleDark : styles.sectionTitle}>Calendar Settings</Text>
        <View style={styles.settingRow}>
          <Text>Sync with Device Calendar</Text>
          <Switch value={calendarSyncEnabled} onValueChange={handleCalendarSyncToggle} />
        </View>
      </View>
      <View style={darkModeEnabled ? styles.sectionDark : styles.section}>
        <Text style={darkModeEnabled ? styles.sectionTitleDark : styles.sectionTitle}>Dark Mode</Text>
        <View style={styles.settingRow}>
          <Text>Enable Dark Mode</Text>
          <Switch value={darkModeEnabled} onValueChange={handleDarkModeToggle} />
        </View>
      </View>
      <View style={darkModeEnabled ? styles.sectionDark : styles.section}>
        <Text style={darkModeEnabled ? styles.sectionTitleDark : styles.sectionTitle}>Help/Support</Text>
        <Button title="Contact Support" onPress={handleHelpSupport} />
      </View>
      <View style={darkModeEnabled ? styles.sectionDark : styles.section}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <AccountSwitcher darkModeEnabled={darkModeEnabled} />
    </View>
  );
};

const AccountSwitcher = ({ darkModeEnabled }) => {
  const [selectedAccount, setSelectedAccount] = useState('Account 1');

  const switchAccount = (accountName) => {
    setSelectedAccount(accountName);
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[styles.accountText, darkModeEnabled && styles.accountTextDark]}>
        Current Account: {selectedAccount}
      </Text>
      <TouchableOpacity onPress={() => switchAccount('Account 1')} style={[styles.button, darkModeEnabled && styles.buttonDark]}>
        <Text style={[styles.buttonText, darkModeEnabled && styles.buttonTextDark]}>Switch to Account 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => switchAccount('Account 2')} style={[styles.button, darkModeEnabled && styles.buttonDark]}>
        <Text style={[styles.buttonText, darkModeEnabled && styles.buttonTextDark]}>Switch to Account 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => switchAccount('Account 3')} style={[styles.button, darkModeEnabled && styles.buttonDark]}>
        <Text style={[styles.buttonText, darkModeEnabled && styles.buttonTextDark]}>Switch to Account 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionDark: {
    marginBottom: 20,
    backgroundColor: '#444',
    borderRadius: 5,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitleDark: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 20,
    marginBottom: 20,
  },
  accountTextDark: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonDark: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
