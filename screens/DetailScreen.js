import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const DetailScreen = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    FetchUniqueProducts();
  }, []);
  const FetchUniqueProducts = async () => {
    let params = 1;
    let response = await axios.get(`https://dummyjson.com/products/${params}`);
    setData(response.data.products);
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
