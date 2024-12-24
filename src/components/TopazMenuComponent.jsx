import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <Image source={item?.image} style={styles.image} />

      <View
        style={{
          width: '55%',
          justifyContent: 'space-between',
          height: 120,
          marginLeft: 10,
          paddingVertical: 5,
        }}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={toggleCart}>
            <Text style={styles.button}>{added ? 'УБРАТЬ' : 'КУПИТЬ'}</Text>
          </TouchableOpacity>

          <Text style={styles.price}>{item?.price} $</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignSelf: 'center',
    height: 120,
    marginTop: 35,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '45%',
    height: 120,
    borderRadius: 12,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '100%',
  },
  description: {
    fontSize: 11,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  price: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginLeft: 10,
    color: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    fontFamily: FONTS.black,
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.white,
    borderColor: COLORS.black,
    backgroundColor: COLORS.main,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
