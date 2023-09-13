import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

const Home = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      fetchData();
    },5000); // Refresh every 5 seconds (adjust the interval as needed)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.43.112:8001/teacher/imageupload/read');
      const data = response.data || [];

      const convertedData = data.map((image) => ({
        ...image,
        url: `data:image/jpeg;base64,${image.baseimage}`,
      }));

      setImageData(convertedData.reverse()); // Reverse the array to display recently uploaded files at the top
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.titleText}>Hello, Veena B Sankappanavar</Text>

        {/* Render the image data */}
        {imageData.map((image, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.content}>
              {image.url ? (
                <Image source={{ uri: image.url }} style={styles.image} />
              ) : (
                <Text>No Image Found</Text>
              )}
              <Text style={styles.title}>{image.head}</Text>
              <Text style={styles.info}>{image.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#242B2E',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default Home;
