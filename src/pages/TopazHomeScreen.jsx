import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import TopazHeader from '../components/TopazHeader';
import TopazMenuComponent from '../components/TopazMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {topazProducts} from '../helpers/topazProducts';

const categories = [
  {label: 'Холодные закуски', image: require('../assets/category_1.png')},
  {label: 'Супы', image: require('../assets/category_2.png')},
  {label: 'Основные блюда', image: require('../assets/category_3.png')},
  {label: 'Десерты', image: require('../assets/category_4.png')},
];

const OnwSportCategoryButton = ({label, active, onPress, image}) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
    <Image source={image} style={styles.image} />
    <Text style={active ? styles.categoryActive : styles.category}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function TopazHomeScreen() {
  const [category, setCategory] = useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <TopazHeader />

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <OnwSportCategoryButton
            key={index}
            label={item.label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
            image={item?.image}
          />
        ))}
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {topazProducts[category].map((product, index) => (
          <TopazMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width,
    marginVertical: 15,
  },
  categoryButton: {
    width: '24%',
    marginTop: 5,
  },
  category: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
    fontSize: 12,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  categoryActive: {
    fontFamily: FONTS.bold,
    color: COLORS.main,
    fontSize: 12,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  main: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 80,
    objectFit: 'contain',
  },
});
