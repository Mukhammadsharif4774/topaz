import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import TopazHeader from '../components/TopazHeader';
import TopazComponent from '../components/TopazComponent';
import Success from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'TopazHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <TopazHeader />

      <Text style={styles.text}>
        Спасибо за {'\n'}
        резерв!
      </Text>

      <Image
        source={Success}
        style={{
          width: width * 0.4,
          height: width * 0.4,
          alignSelf: 'center',
          marginTop: '15%',
        }}
      />

      <TopazComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
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
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 35,
    marginTop: '25%',
    paddingVertical: 20,
    backgroundColor: COLORS.blue,
  },
  description: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 25,
    paddingHorizontal: 50,
  },
});
