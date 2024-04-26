import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { ActivityIndicator, MD2Colors, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Find() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState("");
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        setUserId(id);
        setToken(token);
        console.log(token);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedImage(uri);
      const baseImage = await convertImageToBase64(uri);
      setImageData(baseImage);
      setLoading(true);
      sendToAPI(baseImage, token);
    }
  };

  const sendToAPI = async (imageData, token) => {
    const payload = {
      imageData: imageData
    };
    try {
      const response = await fetch('https://laravel.nanodata.cloud/api/imagedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      const contentType = response.headers.get('content-type');
      if (response.status === 201) {
        console.log(data);
        setLoading(false)
        const id = data.lien.insect;
        navigation.navigate('My Insects', { id: id })
      } else if (contentType && contentType.indexOf('application/json') !== -1) {
        const text = await response.text();
        console.log(`Non-JSON response: ${text}`);
        Alert.alert('You are not connected, please log in and try again !');
        setLoading(false)
      }
    } catch (error) {
      Alert.alert('You are not connected, please log in and try again !');
      setLoading(false)
    }
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.lime700} />
      </View>
    );
  }
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge" style={{ textAlign: "center", top: 290 }} textColor="##77B71C">Allow camera to catch insects ! </Text>
        <Button onPress={requestPermission} style={styles.buttonToggle} mode="contained">
          Allow Camera
        </Button>
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button onPress={toggleCameraType} style={styles.buttonToggle} mode="contained" icon="camera-flip-outline">
            Rotate Camera
          </Button>
          <Button onPress={takePicture} style={styles.buttonPicture} mode="contained" icon="camera">
            Take Picture
          </Button>
        </View>
      </Camera>
      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  buttonToggle: {
    width: 150,
    backgroundColor: '#77B71C',
  },
  buttonPicture: {
    width: 150,
    backgroundColor: '#77B71C',
  },
  button: {
    padding: 0,
    paddingHorizontal: 10,
    position: 'absolute',
    width: 177,
    height: 48,
    top: 340,
    marginLeft: 100,
    backgroundColor: '#77B71C',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
