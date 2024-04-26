import { StyleSheet, View, Image, Pressable, Alert} from 'react-native';
import React, { useState } from 'react';
import { Button, Snackbar } from 'react-native-paper';
import { TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);


    const handleLogin = async () => {
        try {
            const response = await axios.post('https://laravel.nanodata.cloud/api/login', {
                email: login,
                password: password,
            });

            if (response.status === 201) {
                // Successful login
                navigation.navigate('Home');
                AsyncStorage.setItem('id', response.data.user.id.toString(), (error) => {
                    if (error) {
                        console.error('Error storing id:', error);
                    } else {
                        console.log('Id stored successfully');
                    }
                });

                AsyncStorage.setItem('token', response.data.token, (error) => {
                    if (error) {
                        console.error('Error storing token:', error);
                    } else {
                        console.log('Token stored successfully');
                    }
                });
                AsyncStorage.setItem('name', response.data.user.name, (error) => {
                    if (error) {
                        console.error('Error storing name:', error);
                    } else {
                        console.log('Name stored successfully');
                    }
                });

                console.log('youre logged in');
                console.log(response.data);
                setLogin('');
                setPassword('');
                setVisible(true);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            Alert.alert('Login failed : check your login and password');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                }}>
                You're logged in !
            </Snackbar>
            <Image source={require('../svg/login.jpg')} style={styles.img} />
                <View style={styles.inputContainer}>
                    <Text style={{ marginBottom: 10, marginTop: -50 }} variant="headlineMedium">Login Form</Text>
                    <Text variant="bodyLarge" style={{ marginBottom: 35 }}>Please enter your login and password</Text>
                    <TextInput
                        value={login}
                        onChangeText={text => setLogin(text)}
                        placeholder="Username"
                        selectionColor='#ffff'
                        style={{ marginBottom: 10, width: 250, height: 40, backgroundColor: 'white' }}
                    />
                    <TextInput
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password"
                        secureTextEntry={true}
                        selectionColor='#ffff'
                        style={{ marginBottom: 20, width: 250, height: 40, backgroundColor: 'white' }}
                    />

                </View>
            <Button style={styles.loginButton} mode="text" onPress={handleLogin} textColor="white">
                Login
            </Button>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text variant="bodyLarge" style={{ marginTop: 25 }}>Not a member yet? Register</Text>
            </Pressable>
        </View>
    );
}

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bottomFixed: {
        position: 'absolute',
        bottom: 0,
        height: 150,
        width: 425,
    },
    inputContainer: {
        marginVertical: 10,
        marginTop: 130,
    },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingHorizontal: 10,
        width: 177,
        height: 48,
        backgroundColor: '#77B71C',
        color: "white",
    },
    img: {
        position: 'absolute',
        width: 140,
        height: 140,
        left: 34,
        top: 63,
    }
});
