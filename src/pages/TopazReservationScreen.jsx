import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import TopazHeader from '../components/TopazHeader';
import TopazComponent from '../components/TopazComponent';

const InputField = ({placeholder, value, onChangeText}) => (
  <TextInput
    style={styles.textInput}
    placeholderTextColor={COLORS.black}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);

export default function () {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    table: '',
    time: '',
    date: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleReservation = () => {
    navigation.navigate('DrawerNavigator', {
      screen: 'TopazReservationSuccessScreen',
    });
  };

  return (
    <View style={styles.container}>
      <TopazHeader />

      <Text style={styles.title}>Резерв столика</Text>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        <InputField
          placeholder={'Имя...'}
          value={formData.phone}
          onChangeText={text => handleInputChange('name', text)}
        />

        <InputField
          placeholder={'Номер телефона'}
          value={formData.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />

        <InputField
          placeholder={'Столик'}
          value={formData.table}
          onChangeText={text => handleInputChange('table', text)}
        />

        <InputField
          placeholder={'Время'}
          value={formData.time}
          onChangeText={text => handleInputChange('time', text)}
        />

        <InputField
          placeholder={'Дата'}
          value={formData.date}
          onChangeText={text => handleInputChange('date', text)}
        />
      </ScrollView>

      <TopazComponent
        text={'Зарезервировать'}
        style={styles.button}
        onPress={handleReservation}
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
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    margin: 20,
    textAlign: 'center',
  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    width: width * 0.9,
    alignSelf: 'center',
  },
  textInput: {
    height: 50,
    width: '100%',
    fontSize: 14,
    fontFamily: FONTS.bold,
    textAlign: 'left',
    color: COLORS.black,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: COLORS.blue,
    marginTop: 10,
    borderRadius: 25,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
