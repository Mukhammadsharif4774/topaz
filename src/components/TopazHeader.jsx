import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, width} from '../helpers/colors';
import Burger from '../assets/burger.png';
import Cart from '../assets/cart_icon.png';
import BackIcon from '../assets/back_icon.png';
import Logo from '../assets/logo.png';
export default function ({back = false}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => (back ? navigation.goBack() : navigation.openDrawer())}>
        <Image source={back ? BackIcon : Burger} style={styles.image} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.logo} />

      <TouchableOpacity onPress={() => navigation.navigate('TopazCartScreen')}>
        <Image source={Cart} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  image: {
    width: 35,
    height: 35,
    objectFit: 'contain',
  },
  logo: {
    width: '50%',
    height: 50,
    objectFit: 'contain',
  },
});
