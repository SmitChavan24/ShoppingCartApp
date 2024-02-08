import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = async () => {
    let response = await axios.get('https://dummyjson.com/products');

    setData(response.data);
    console.log(Data, '<=====products');
  };
  return (
    <View>
      <StatusBar
        backgroundColor="#ffb3ff"
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
      />
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        useAngle={true}
        angle={180}
        colors={['#ffb3ff', '#f2f2f2']}
        style={{
          width: '100%',
          height: '30%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginTop: '5%',
          }}>
          Welcome to Shopping Cart
        </Text>
        <TextInput
          placeholder="Search"
          style={{
            width: '50%',
            height: 30,
            marginLeft: '2.5%',
            fontSize: 12,
            borderColor: 'black',
            borderWidth: 1,
            textAlign: 'center',
            borderRadius: 5,
          }}></TextInput>
      </LinearGradient>

      {/* <Button
        title="press"
        onPress={() => navigation.navigate('details')}
        
        ></Button> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
