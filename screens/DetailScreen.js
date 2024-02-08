import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';

const DetailScreen = () => {
  useEffect(() => {
    FetchUniqueProducts();
  }, []);
  const FetchUniqueProducts = async () => {
    let params = 1;
    let response = await axios.get(`https://dummyjson.com/products/${params}`);
    console.log(response.data);
  };
  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
