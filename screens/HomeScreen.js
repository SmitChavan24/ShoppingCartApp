import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import shadowProp from '../utils/shadowProp';
import AnimatedLoader from 'react-native-animated-loader';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      if (response) {
        setData(response.data.products);
        setLoading(false);
        setError(false);
      } else {
        console.log('im here');
        setError(true);
      }
    } catch (error) {
      // console.error('Error fetching products:', error);
      setError(true);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
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
        style={[
          {
            width: '100%',
            height: '15%',
            alignItems: 'center',
            backgroundColor: 'white',
          },
          shadowProp(15, 'black'),
        ]}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginTop: '5%',
          }}>
          Welcome to Shopping Cart
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '5%',
            alignSelf: 'flex-end',
          }}>
          <AntDesign name="search1" size={25} color="black" />
          <TextInput
            placeholder="Search"
            style={{
              width: '70%',
              height: 30,
              fontSize: 15,
              backgroundColor: '#e6e6e6',
              borderColor: 'black',
              borderWidth: 1,
              paddingVertical: 0.1,
              textAlignVertical: 'center',
              fontWeight: '800',
              paddingLeft: '3%',
              marginLeft: '4%',
              alignSelf: 'flex-end',
              marginRight: '5%',
              borderRadius: 3,
            }}></TextInput>
        </View> */}
      </LinearGradient>
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../assets/lottie/loading.json')}
        animationStyle={styles.lottie}
        speed={0.6}
      />

      {!error ? (
        <FlatList
          data={Data}
          keyExtractor={id => id.id}
          showsVerticalScrollIndicator={false}
          style={{
            alignSelf: 'center',
            paddingVertical: '5%',
          }}
          renderItem={({item, index}) => (
            <View style={{marginBottom: '5%', marginTop: 10}}>
              <Pressable
                style={[
                  {
                    height: (height * 20) / 100,
                    width: (width * 90) / 100,
                    borderRadius: 5,
                    borderColor: '#f2f2f2',
                    borderWidth: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                  shadowProp(1),
                ]}
                key={index}
                onPress={() => navigation.navigate('details', {item})}>
                <Image
                  source={{
                    uri: item.thumbnail,
                  }}
                  style={{
                    height: (height * 17) / 100,
                    flex: 1,
                    marginLeft: '3%',
                    borderRadius: 2,
                    borderColor: 'grey',
                    borderWidth: 0.5,
                  }}
                />
                <View
                  style={{
                    height: (height * 17) / 100,
                    flex: 2,
                    marginLeft: '5%',
                    marginRight: '3%',
                    marginTop: '5%',
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      letterSpacing: 0.3,
                      fontSize: 16,
                      color: 'black',
                    }}>
                    {item.title}
                  </Text>

                  <View style={{marginTop: '2%'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.description}>{'Brand '}</Text>
                      <Text style={styles.dataDesc}>{item.brand}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.description}>{'Price '}</Text>
                      <Text style={styles.dataDesc}>{`${item.price} INR`}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.description}>{'Ratings '}</Text>
                      <Text style={styles.dataDesc}>{item.rating}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.description}>{'Discount '}</Text>
                      <Text
                        style={
                          styles.dataDesc
                        }>{`${item.discountPercentage} %`}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          )}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>There might be error with the server or internet</Text>
        </View>
      )}

      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        useAngle={true}
        angle={360}
        colors={['#ffb3ff', '#f2f2f2']}
        style={[
          {
            alignSelf: 'baseline',
            backgroundColor: 'white',
            width: '100%',
            height: '5%',
          },
          shadowProp(15, 'black'),
        ]}></LinearGradient>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  line: {
    width: '90%',
    height: 0.2,
    backgroundColor: 'grey',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 10,
    width: '25%',
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
    marginVertical: '1.5%',
  },
  dataDesc: {fontSize: 14, color: '#000033', width: '70%'},
});
