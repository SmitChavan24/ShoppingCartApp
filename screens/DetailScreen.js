import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const DetailScreen = props => {
  const params = props.route.params.item.id;
  console.log(params, typeof params);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    FetchUniqueProducts();
  }, []);
  const FetchUniqueProducts = async () => {
    let response = await axios.get(`https://dummyjson.com/products/${params}`);
    setData(response.data);
  };
  return (
    <View>
      {console.log(Data)}
      <Text>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
