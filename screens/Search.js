import React, {useState, useEffect} from 'react';
import {TextInput, Button, Card} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import Header from './Header';

import {Icon} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default Search = ({navigation}) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const fetchCities = text => {
    setCity(text);
    fetch(
      'https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=' +
        text +
        '&locationType=city&format=json',
    )
      .then(item => item.json())
      .then(cityData => {
        setCities(cityData.location.address);
      });
  };
  const btnClick = () => {
    navigation.navigate('Home', {city: city});
  };
  const listClick = cityname => {
    setCity(cityname);
    navigation.navigate('Home', {city: cityname});
  };
  return (
    <View style={{flex: 1}}>
      <Header name="SearchScreen" />
      <TextInput
        label="city name"
        theme={{colors: {primary: '#00aaff'}}}
        value={city}
        onChangeText={text => fetchCities(text)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}
        onPress={() => btnClick()}>
        <Text style={{color: 'white'}}>Save changes</Text>
      </Button>
      <FlatList
        data={cities}
        renderItem={({item}) => {
          return (
            <Card
              style={{margin: 2, padding: 12}}
              onPress={() => listClick(item.toString())}>
              <Text>{item.toString()}</Text>
            </Card>
          );
        }}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
};
