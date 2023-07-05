import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import DocumentPicker from 'react-native-document-picker';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isSceneVisible, setSceneVisible] = useState(true);

  useEffect(() => {
    // Set up initial messages
    setMessages([
      {
        _id: 1,
        text: 'Hello, how can I assist you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
        },
      },
    ]);
  }, []);

  const handleSend = (newMessages) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    // Send the newMessages to the server or perform any desired actions
  };

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Handle the selected file or perform any desired actions
    } catch (error) {
      console.log('Error picking file:', error);
    }
  };

  const toggleScene = () => {
    setSceneVisible((prevSceneVisible) => !prevSceneVisible);
  };

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={handleFilePicker} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleScene} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>
          {isSceneVisible ? 'Unscene' : 'Scene'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isSceneVisible && (
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: 1,
          }}
          renderActions={renderActions}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButton: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Chat;
