import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import paddingHelper from '../utils/paddingHelper';
import NavigationBackComponent from '../components/NavigationBack';
import shadowProp from '../utils/shadowProp';
import AnimatedLoader from 'react-native-animated-loader';
import NetInfo from '@react-native-community/netinfo';

const {width, height} = Dimensions.get('window');

const DetailScreen = props => {
  const params = props?.route?.params?.item;
  console.log(params);

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    // FetchUniqueProducts();
    return () => {
      unsubscribe();
    };
  }, []);
  const handleConnectivityChange = state => {
    if (state.isConnected) {
      // Internet connection is available, fetch data
      // FetchUniqueProducts();
    }
  };
  // const FetchUniqueProducts = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://dummyjson.com/products/${params}`,
  //     );
  //     if (response) {
  //       setData(response?.data);
  //       setLoading(false);
  //       setError(false);
  //     } else {
  //       setError(true);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setError(true);
  //     setLoading(false);
  //   }
  // };
  const handlePaginationPress = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
    setActiveIndex(index);
  };

  return (
    <View style={[{flex: 1, backgroundColor: 'white'}, paddingHelper()]}>
      <NavigationBackComponent
        name="Book Details"
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
        {/* <View style={[styles.container, shadowProp(10, 'black')]}> */}
        <Image
          source={{
            uri: `https://covers.openlibrary.org/b/id/${params?.cover_id}-L.jpg`,
          }}
          style={[styles.img]}
        />
        {/* </View> */}

        <View style={styles.detailsContainer}>
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              margin: '1%',
              fontSize: 18,
              marginBottom: '2%',
            }}>
            {'Book Details'}
          </Text>

          <View style={styles.table}>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'Name'}</Text>
              <Text style={styles.valueText}>{params?.title}</Text>
            </View>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'Author'}</Text>
              {params?.authors?.map((item, index) => (
                <Text style={styles.valueText} key={index}>
                  {item.name}
                </Text>
              ))}
            </View>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'Published In'}</Text>
              <Text style={styles.valueText}>{params?.first_publish_year}</Text>
            </View>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'Availability'}</Text>
              <Text style={styles.valueText}>
                {params?.availability?.status
                  ? params?.availability?.status
                  : 'unavailable'}
              </Text>
            </View>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'In Stock'}</Text>
              <Text style={styles.valueText}>{`${params?.stock} units`}</Text>
            </View>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'Genres'}</Text>
              <ScrollView style={{marginLeft: '10%'}}>
                {params?.subject.map((item, index) => (
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 30,
                      color: '#0E0E0E',
                    }}
                    key={index}>
                    {item}{' '}
                  </Text>
                ))}
              </ScrollView>
            </View>
            <View style={styles.flexrow}>
              <Text style={styles.labelText}>{'Description'}</Text>
              <Text style={styles.valueText}>{params?.description}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  img: {
    height: (height * 20.5) / 100,
    width: (width * 70) / 100,
    padding: '3%',
    alignSelf: 'center',
    resizeMode: 'repeat',
    marginBottom: '5%',
    borderRadius: 5,
  },
  tPagi: {width: 10, height: 10, borderRadius: 5, margin: 5},
  paginate: {flexDirection: 'row', justifyContent: 'center', marginTop: '2%'},
  container: {
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
