import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import TopazHeader from '../components/TopazHeader';
import TopazComponent from '../components/TopazComponent';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'TopazHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <TopazHeader />

      <Text style={styles.text}>Спасибо за {'\n'} заказ!</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value="https://www.tripadvisor.ru/Restaurant_Review-g293924-d8073999-Reviews-Topaz_Beer_Club_Almaz-Hanoi.html"
          size={Dimensions.get('window').width / 2.5}
          color={COLORS.blue}
        />
      </View>

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
  qrContainer: {
    alignItems: 'center',
    marginTop: '25%',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  successIcon: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 32,
    marginTop: '15%',
    paddingVertical: 15,
    backgroundColor: COLORS.blue,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: 20,
  },
});
