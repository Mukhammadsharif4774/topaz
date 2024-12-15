import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import TopazHeader from '../components/TopazHeader';
import {useNavigation} from '@react-navigation/native';
import Event_1 from '../assets/event_1.png';
import Event_2 from '../assets/event_2.png';
import Event_3 from '../assets/event_3.png';
import Event_4 from '../assets/event_4.png';
import Event_5 from '../assets/event_5.png';

const events = [
  {title: 'Винный Марафон', image: Event_1, time: '19.01.2025'},
  {
    title: 'Джазовый Бранч',
    image: Event_2,
    time: '20.01.2025',
  },
  {title: 'Сырная Симфония', image: Event_3, time: '23.01.2025'},
  {title: 'Европейский Спортивный Ужин', image: Event_4, time: '30.01.2025'},
  {title: 'Чемпионский Футбольный Бранч', image: Event_5, time: '31.01.2025'},
];

const EventButton = ({title, image, onPress, index, time}) => (
  <>
    <Text style={styles.time}>{time}</Text>
    <TouchableOpacity style={styles.button} onPress={() => onPress(image)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </>
);

export default function () {
  const navigation = useNavigation();

  const handlePress = image => {
    navigation.navigate('DrawerNavigator', {
      screen: 'TopazEventDetailScreen',
      params: {image},
    });
  };

  return (
    <View style={styles.container}>
      <TopazHeader />

      <View style={styles.content}>
        {events.map((event, index) => (
          <EventButton
            key={index}
            index={index}
            title={event.title}
            image={event.image}
            onPress={handlePress}
            time={event.time}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  button: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.main,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.main,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: width,
    marginTop: '10%',
  },
  time: {
    marginTop: 15,
    marginBottom: 3,
    color: COLORS.black,
    fontSize: 18,
    fontFamily: FONTS.regular,
    width: '100%',
    textAlign: 'center',
  },
});
