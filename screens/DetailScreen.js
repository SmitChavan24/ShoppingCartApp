import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import paddingHelper from '../utils/paddingHelper';
import NavigationBackComponent from '../components/NavigationBack';
import shadowProp from '../utils/shadowProp';
import AnimatedLoader from 'react-native-animated-loader';
import NetInfo from "@react-native-community/netinfo";

const {width, height} = Dimensions.get('window');

const DetailScreen = props => {
  const params = props?.route?.params?.item?.id;

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    FetchUniqueProducts();
    return () => {
      unsubscribe();
    };

  }, []);
  const handleConnectivityChange = (state) => {
    if (state.isConnected) {
      // Internet connection is available, fetch data
      FetchUniqueProducts();
    }
  };
  const FetchUniqueProducts = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${params}`,
      );
      if (response) {
        setData(response?.data);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  const handlePaginationPress = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
    setActiveIndex(index);
  };

  return (
    <View style={[{flex: 1, backgroundColor: 'white'}, paddingHelper()]}>
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
              <AnimatedLoader
        visible={error}
        overlayColor="grey"
        source={require('../assets/lottie/error.json')}
        animationStyle={styles.lottie}
        speed={0.6}
      />
      
        <View>
          <View
            style={[
              styles.container,
              shadowProp(10, 'black'),
            ]}>
            <FlatList
              ref={flatListRef}
              data={Data.images}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              onScroll={event => {
                const contentOffsetX = event.nativeEvent.contentOffset.x;
                const currentIndex = Math.round(contentOffsetX / width);
                setActiveIndex(currentIndex);
              }}
            />
          </View>
          <View style={styles.paginate}>
            {Data?.images?.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                 styles.tPagi  ,
                  index == activeIndex
                    ? {backgroundColor: 'blue'}
                    : {backgroundColor: 'grey'},
                ]}
                onPress={() => handlePaginationPress(index)}></TouchableOpacity>
            ))}
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailHeader}>
              <Text>{'Product Details'}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Name'}</Text>
                <Text style={styles.valueText}>{Data?.title}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Brand'}</Text>
                <Text style={styles.valueText}>{Data?.brand}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Price'}</Text>
                <Text style={styles.valueText}>{`${Data?.price} INR`}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Rating'}</Text>
                <Text style={styles.valueText}>{Data?.rating}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'In Stock'}</Text>
                <Text style={styles.valueText}>{`${Data?.stock} units`}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Discount'}</Text>
                <Text
                  style={
                    styles.valueText
                  }>{`${Data?.discountPercentage} %`}</Text>
              </View>
              <View style={styles.flexrow}>
                <Text style={styles.labelText}>{'Description'}</Text>
                <Text style={styles.valueText}>{Data?.description}</Text>
              </View>
            </View>
          </View>
        </View>


    
    </View>
  );
};
const renderItem = ({item, index}) => (
  <View key={index}>
    <Image
      source={{uri: item}}
      style={[
       styles.img,
      ]}
    />
  </View>
);

export default DetailScreen;

const styles = StyleSheet.create({
  img: {
    height: (height * 30.5) / 100,
    width: (width * 100) / 100,
    padding: '3%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  tPagi: {width: 10, height: 10, borderRadius: 5, margin: 5},
  paginate:{flexDirection: 'row', justifyContent: 'center',marginTop:'2%'},
  container:{
    marginTop: '3%',
    backgroundColor: 'white',
    height: (height * 30) / 100,
  },
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
    fontSize: 14,
    color: '#7A7A7A',
    lineHeight: 30,
    width: '55%',
  },
  valueText: {
    fontSize: 14,
    lineHeight: 30,
    color: '#0E0E0E',
    marginLeft: '10%',
    width: '70%',
  },
});
