import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = async () => {
    let response = await axios.get('https://dummyjson.com/products');
    console.log(response.data);
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="press"
        onPress={() => navigation.navigate('details')}></Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
