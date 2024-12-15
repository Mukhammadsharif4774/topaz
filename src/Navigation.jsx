import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import TopazHomeScreen from './pages/TopazHomeScreen';
import TopazCartScreen from './pages/TopazCartScreen';
import TopazCartSuccessScreen from './pages/TopazCartSuccessScreen';
import TopazReservationScreen from './pages/TopazReservationScreen';
import TopazReservationSuccessScreen from './pages/TopazReserveSuccessScreen';
import TopazContactsScreen from './pages/TopazContactsScreen';
import TopazEventsScreen from './pages/TopazEventsScreen';
import TopazEventDetailScreen from './pages/TopazEventDetailScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart_icon.png';
import Logo from './assets/logo.png';
import TopazTranslationsScreen from './pages/TopazTranslationsScreen';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.white,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'TopazHomeScreen'},
    {label: 'КОРЗИНА', screen: 'TopazCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'TopazTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'TopazContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'TopazReservationScreen'},
    {label: 'СОБЫТИЯ', screen: 'TopazEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={
              screen === 'TopazHomeScreen'
                ? styles.drawerItemFirst
                : styles.drawerItem
            }>
            <Text
              style={
                screen === 'TopazHomeScreen'
                  ? styles.itemTextFirst
                  : styles.itemText
              }>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('TopazCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </View>
  );
}

const drawerScreens = [
  {name: 'TopazHomeScreen', component: TopazHomeScreen},
  {name: 'TopazCartScreen', component: TopazCartScreen},
  {name: 'TopazCartSuccessScreen', component: TopazCartSuccessScreen},
  {name: 'TopazReservationScreen', component: TopazReservationScreen},
  {
    name: 'TopazReservationSuccessScreen',
    component: TopazReservationSuccessScreen,
  },
  {name: 'TopazContactsScreen', component: TopazContactsScreen},
  {name: 'TopazEventsScreen', component: TopazEventsScreen},
  {name: 'TopazEventDetailScreen', component: TopazEventDetailScreen},
  {name: 'TopazTranslationsScreen', component: TopazTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: width,
  },
  drawerItemFirst: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.blue,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    backgroundColor: COLORS.main,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.main,
  },
  itemText: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'center',
  },
  itemTextFirst: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.main,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
