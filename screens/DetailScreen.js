import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import paddingHelper from '../utils/paddingHelper';
import NavigationBackComponent from '../components/NavigationBack';
import shadowProp from '../utils/shadowProp';
import AnimatedLoader from 'react-native-animated-loader';

const {width, height} = Dimensions.get('window');

const DetailScreen = props => {
  const params = props.route.params.item.id;
  console.log(params, typeof params);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    FetchUniqueProducts();
  }, []);
  const FetchUniqueProducts = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${params}`,
      );
      if (response) {
        setData(response.data);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    }
  };
  return (
    <View style={[{flex: 1, backgroundColor: 'white'}, paddingHelper()]}>
      {console.log(Data)}
      <NavigationBackComponent
        name="Product Details"
        onPress={() => props.navigation.navigate('home')}
      />
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../assets/lottie/loading.json')}
        animationStyle={styles.lottie}
        speed={0.6}
      />
      {!error ? (
        <View>
          <View
            style={[
              {
                marginTop: '3%',
                backgroundColor: 'white',
                height: (height * 30) / 100,
              },
              shadowProp(10, 'black'),
            ]}>
            <FlatList
              data={Data.images}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailHeader}>
              <Text>{'Product Details'}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Name'}</Text>
                <Text style={styles.valueText}>{Data.title}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Brand'}</Text>
                <Text style={styles.valueText}>{Data.brand}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Price'}</Text>
                <Text style={styles.valueText}>{`${Data.price} INR`}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Rating'}</Text>
                <Text style={styles.valueText}>{Data.rating}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'In Stock'}</Text>
                <Text style={styles.valueText}>{`${Data.stock} units`}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Discount'}</Text>
                <Text
                  style={
                    styles.valueText
                  }>{`${Data.discountPercentage} %`}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Description'}</Text>
                <Text style={styles.valueText}>{Data.description}</Text>
              </View>
            </View>
          </View>
          {/* <View>
            <Text>{Data.title}</Text>
            <Text>{Data.brand}</Text>
            <Text>{Data.price}</Text>
            <Text>{Data.rating}</Text>
            <Text>{Data.stock}</Text>
            <Text>{Data.description}</Text>
            <Text>{Data.discountPercentage}</Text>
          </View> */}
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>There might be error with the server or internet</Text>
        </View>
      )}
    </View>
  );
};
const renderItem = ({item, index}) => (
  <Image
    key={index}
    source={{uri: item}}
    style={[
      {
        height: (height * 30.5) / 100,
        width: (width * 100) / 100,
        padding: '3%',
        resizeMode: 'contain',
        borderRadius: 5,
      },
    ]}
  />
);

export default DetailScreen;

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
  table: {
    flexDirection: 'column',
    marginRight: '25%',
  },
  flexrow: {
    flexDirection: 'row',
  },
  detailsContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: (width * 2.5) / 100,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    marginTop: '5%',
    padding: 15,
    paddingBottom: (height * 3.5) / 100,
  },
  detailHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: '3%',
  },
  labelText: {
    // fontFamily: globalColors.fontMedium,
    fontSize: 12,
    color: '#7A7A7A',
    lineHeight: 24,
    width: '55%',
  },
  valueText: {
    // fontFamily: globalColors.fontRegular,
    fontSize: 12,
    lineHeight: 24,
    color: '#0E0E0E',
    marginLeft: '10%',
    width: '70%',
  },
});
