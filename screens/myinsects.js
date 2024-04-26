import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, MD2Colors } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import Myaccount from '../components/myaccount';
import Mycollection from '../components/mycollection';

const renderScene = SceneMap({
  account: Myaccount,
  collection: Mycollection,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#77B71C',textColor:"black" }}
  />
);
const Myinsects = () => {
  const navigation = useNavigation();
  const userId = AsyncStorage.getItem('id');
  const token = AsyncStorage.getItem('token');

  const [activeKey, setActiveKey] = useState(0);

  return (
    <View style={styles.container}>
      {userId && token ? (
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index: activeKey, routes: [{ key: 'account', title: 'My account' }, { key: 'collection', title: 'My collection' }] }}
          renderScene={renderScene}
          onIndexChange={index => setActiveKey(index)}
        />
      ) : (
        <>
          <View style={styles.inlineContainer}>
            <Text>Insecti</Text>
            <Text style={styles.coloredText}>Dex</Text>
            <Text> You are not logged in !</Text>
          </View>
          <Button onPress={() => navigation.navigate('Login')} style={styles.button}>Start</Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coloredText: {
    color: '#77B71C',
  },
  button: {
    padding: 10,
    width: 100,
    height: 48,
    marginVertical: 20,
    backgroundColor: '#77B71C',
  },
});

export default Myinsects;
