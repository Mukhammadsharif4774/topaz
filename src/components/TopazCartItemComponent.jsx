import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';
import {topazAllProducts} from '../helpers/topazProducts';
import DeleteIcon from '../assets/delete_icon.png';

const TopazCartItemComponent = ({item}) => {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [shouldRefresh]);

  const productImage = topazAllProducts.find(p => p.name === item.name)?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.row}>
          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                carts.find(product => product.name === item.name)?.count > 1
                  ? decrement()
                  : deleteItem()
              }>
              <Text style={styles.plusMinus}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>
              {carts.find(product => product.name === item.name)?.count || 0}
            </Text>

            <TouchableOpacity style={styles.actionButton} onPress={increment}>
              <Text style={styles.plusMinus}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.currencyText}>{`${item.price} $`}</Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteItem()}>
            <Image source={DeleteIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  image: {
    width: '45%',
    height: 100,
    borderRadius: 12,
    marginTop: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '90%',
  },
  description: {
    fontSize: 11,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '90%',
    marginTop: 1,
  },
  currencyText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginLeft: 15,
    color: COLORS.black,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 5,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.2,
    borderRadius: 8,
    borderColor: COLORS.main,
    borderWidth: 1,
    backgroundColor: COLORS.main,
  },
  count: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginHorizontal: 10,
    color: COLORS.white,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  plusMinus: {
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.black,
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
});

export default TopazCartItemComponent;
