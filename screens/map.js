import { StyleSheet, View, Dimensions, Text, Image, Pressable } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
// import MapView, { Marker, Overlay } from 'react-native-maps';
const Map = () => {
    return (
        <View>
            <Button onClick={() => navigation.navigate('InsectiDex')}><Feather name="camera" size={24} color="white" /></Button>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({})