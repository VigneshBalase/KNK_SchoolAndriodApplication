import { Button, ScrollView } from 'native-base';
import React, { useState} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

import CustomSwitch from './customswitch';

import {Calendar} from 'react-native-calendars';



const Home = ({ title, author, date, image }) => {

  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');

  const handelbutton = () => {
    console.log(selected)
  }

  const onSelectSwitch = index => {

 if (index==1) {
  setLoading(true)
  
 } else {
  setLoading(false)
 }

  };

  return (

  <SafeAreaView>
    <ScrollView>

    <Text style={styles.titleText}>Hello,KNK Students</Text>

<View style={{marginLeft:10,marginBottom:10}}>
<CustomSwitch
      selectionMode={1}
      roundCorner={true}
      option1={'Main'}
      option2={'Schedule'}
      onSelectSwitch={onSelectSwitch}
      selectionColor={'white'}
    />
  </View>


      {isLoading ? (
      <><View style={styles.card}>
      <View style={styles.content}>
      <Image source={{ uri: 'https://th-i.thgim.com/public/incoming/8bb5nr/article65407753.ece/alternates/FREE_1200/2699_12_5_2022_17_58_4_1_13HUBLIKLEIT.JPG', }} style={styles.image} />
        <Text style={styles.title}>KLE Institute of Technology{title}</Text>
        <Text style={styles.author}>10min ago from Admin Department{author}</Text>
        <Text style={styles.info}>{date}The K.L.E Society's KLE Institute of Technology is an engineering college in Hubli, India. Established in 2008, it is one of the institutes under the banner of Karnatak Lingayat Education Society. KLEIT is approved by the AICTE and recognized by University Grant Commission of India.
  </Text>
      </View>
    </View>
    <View style={styles.card}>
      <View style={styles.content}>
      <Image source={{ uri: 'https://cache.careers360.mobi/media/colleges/social-media/media-gallery/4075/2021/8/5/Campus%20View%20of%20KLE%20Institute%20of%20Technology%20Hubli_Campus-View.jpg', }} style={styles.image} />
        <Text style={styles.title}>Title{title}</Text>
        <Text style={styles.author}>10min ago from Admin Department{author}</Text>
        <Text style={styles.info}>10min ago{date}</Text>
      </View>
    </View></>
      ) : (

    <>
        <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'},
          '2023-06-26': {selected: true, selectedColor: 'green'}
        }}

      />
{/* 
      <Button onPress={handelbutton()}>
        Button
      </Button> */}

<View style={styles.card}>
      <View style={styles.content}>
       <Text style={styles.title}>3rd Phase Review{title}</Text>
      </View>
    </View>

      </>
      )}
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
  author: {
    marginTop: 5,
    fontSize: 16,
  },
  info: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color:"#242B2E",
    marginTop:15,
    marginLeft:20,
    marginBottom:10,
  },
});

export default Home;