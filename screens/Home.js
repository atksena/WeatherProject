import React, {useState, useEffect} from 'react';
import {TextInput, Button, Card, Title} from 'react-native-paper';
import {View, Text, FlatList, Image} from 'react-native';
import Header from './Header';

const Home = props => {
  const [info, setInfo] = useState({
    Name: 'loading !!',
    Temp: 'loading',
    Humidity: 'loading',
    Desc: 'loading',
    Icon: 'loading',
  });
  useEffect(() => {
    getWeather();
  }, []);
  const getWeather = () => {
    let MyCity;
    const {city} = props.route.params;
    MyCity = city;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=bacbd4b080bd7f2dbd2119c8512940d5&units=metric`,
    )
      .then(data => data.json())
      .then(results => {
        setInfo({
          Name: results.name,
          Temp: results.main.temp,
          Humidity: results.main.humidity,
          Desc: results.weather[0].description,
          Icon: results.weather[0].icon,
        });
      });
  };
  if (props.route.params.city != 'london') {
    getWeather();
  }
  return (
    <View style={{fllex: 1}}>
      <Header name="Weather App" />
      <View style={{alignItems: 'center'}}>
        <Title
          style={{
            color: '00aaff',
            marginTop: 30,
            fontSize: 30,
          }}>
          {info.Name}
        </Title>
        <Image
          style={{
            width: 120,
            height: 120,
          }}
          source={{
            uri: 'https://openweathermap.org/img/w/' + info.Icon + '.png',
          }}
        />
      </View>

      <Card
        style={{
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#00aaff'}}>Temperature - {info.Temp}</Title>
      </Card>
      <Card
        style={{
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#00aaff'}}>Humidity - {info.Humidity}</Title>
      </Card>
      <Card
        style={{
          margin: 5,
          padding: 12,
        }}>
        <Title style={{color: '#00aaff'}}>Description - {info.Desc}</Title>
      </Card>
    </View>
  );
};

export default Home;
