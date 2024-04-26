import { StyleSheet, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Text } from 'react-native-paper';
import axios from 'axios';

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://laravel.nanodata.cloud/api/register', {
                name: username,
                email: email,
                password: password,
                password_confirmation: password
            });
            // Inscription réussie, afficher un message ou rediriger l'utilisateur
            if (response.status === 201) {
                console.log('Register successful');
                console.log(response.data);
                navigation.navigate('Login');
                setVisible(true);
                setUsername('');
                setEmail('');
                setPassword('');
            } else if (response.data.errors && response.data.errors.message === 'Request failed with status code 422') {
                Alert.alert('Invalid credentials. Please check your username and password.');
            } else {
                Alert.alert('Registration failed');
                console.log(response.data);
            }
        } catch (error) {
            // Erreur lors de l'inscription, afficher un message d'erreur
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
                You're registered !
            </Snackbar>
            <View style={styles.inputContainer}>
                <Text style={{ marginBottom: 10, top: 0 }} variant="headlineMedium">Register Form</Text>
                <Text variant="bodyLarge" style={{ marginBottom: 35 }}>Please enter your informations to register</Text>
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Username"
                    type="text"
                    clearOnEscape
                    style={{ marginBottom: 10, width: 250, height: 40, backgroundColor: 'white' }}
                />
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    type="email"
                    clearOnEscape
                    style={{ marginBottom: 10, width: 250, height: 40, backgroundColor: 'white' }}
                />
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    type="password"
                    clearOnEscape
                    style={{ marginBottom: 20, width: 250, height: 40, backgroundColor: 'white' }}
                />
            </View>
            <Button style={styles.RegisterButton} onPress={handleRegister} textColor="white">Register</Button>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text variant="bodyLarge" style={{ marginTop: 25 }}> Already a member ? Login </Text>
            </Pressable>
            <Image source={require('../svg/register.png')} style={styles.img} />
        </View>
    )
}

export default RegisterForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        marginVertical: 10,
        marginTop: -100,
    },
    topFixed: {
        position: 'absolute',
        top: 0,
        height: 150,
    },
    button: {
        marginVertical: 20,
    },
    img: {
        position: 'absolute',
        width: 140,
        height: 140,
        right: 34,
        bottom: 80,
    },
    RegisterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingHorizontal: 10,
        width: 177,
        height: 48,
        backgroundColor: '#77B71C',
    },
});
