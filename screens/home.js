import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button,Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  
  useEffect(() => {
    const UserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        const userName = await AsyncStorage.getItem('name');
        if (userId && token !== null) {
          setUserId(userId);
          setToken(token);
          setUser(userName);
        }
      } catch (error) {
        console.error(error);
      }
    };
    UserData();
  }, []);
  


  return (
    <View style={styles.container}>
      {token ? (
        <>
          <Image source={require('../svg/imagetop.png')} style={styles.topFixed} />
          <Image source={require('../svg/imagebottom.png')} style={styles.bottomFixed} />
          <View style={styles.inlineContainer}>
            <Text variant="displayLarge" style={{fontSize:30}}>Hello</Text>
            <Text style={styles.coloredText} variant="displayLarge"> {user}</Text>
          </View>
          <Button onPress={() => navigation.navigate('InsectiDex')} style={styles.button} textColor="white">Go to InsectiDex</Button>
          {/* <Button onPress={() => navigation.navigate('Login')} style={styles.button}>Start</Button> */}
        </>
      ) : (
        <>
          <Image source={require('../svg/imagebottom.png')} style={styles.bottomFixed} />
          <View style={styles.inlineContainer}>
            <Text variant="displayLarge" style={{fontSize:30}}>Insecti</Text>
            <Text style={styles.coloredText} variant="displayLarge" >Dex</Text>
          </View>
          <Button onPress={() => navigation.navigate('Login')} style={styles.button} textColor="white">Start</Button>
          <Image source={require('../svg/imagetop.png')} style={styles.topFixed} />
        </>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inlineContainer: {
    flexDirection: 'row',
  },
  coloredText: {
    color: '#77B71C',
    fontSize:30,
  },
  bottomFixed: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    width: '120%'
  },
  topFixed: {
    position: 'absolute',
    top: 0,
    height: '20%',
    width: '120%'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 10,
    position: 'absolute',
    width: 177,
    height: 48,
    top: 520,
    backgroundColor: '#77B71C',
  },
}) 
