import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, Snackbar,Avatar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import { Modal, Portal, Provider } from 'react-native-paper';

const Myaccount = () => {
    const [userData, setUserData] = useState([]);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");

    const [userPFP, setUserPFP] = useState("");


    const [visible, setVisible] = useState(false);
    console.log(token);
    const navigation = useNavigation();
    console.log(userPFP);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');
                if (userId && token) {
                    setUserId(userId);
                    setToken(token);
                    const url = `https://laravel.nanodata.cloud/api/myaccount`;
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    if (response.status === 200) {
                        setUserData(response.data);
                    } else {
                        console.log('UserData', response.data);
                    }
                }
            } catch (error) {
                console.error('FetchDataError', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getPfP = async () => {
            if (userData.name) {
                const apiUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random&rounded=true&size=64`;
                axios.get(apiUrl)
                    .then(response => {
                        console.log('Profile picture URL:', response.data);
                        setUserPFP(apiUrl);
                        console.log('URL', apiUrl)
                    })
                    .catch(error => {
                        console.error('Error fetching profile picture:', error);
                    });
            }
        };
        getPfP();
    }, [userData]);
    console.log('userData:', userData);

    const manageAccount = async () => {
        try {
            const url = `https://laravel.nanodata.cloud/api/myaccount/manage`;
            const response = await axios.post(url, {
                email: email,
                password: password,
                deleteAccount: true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log('Account management response:', response.data);
                if (response.data.message === 'Account deleted successfully') {
                    // Handle account deletion
                    console.log('Account deleted');
                    setVisible(true);
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('id');
                    await AsyncStorage.removeItem('name');
                    navigation.navigate('Home');
                } else {
                    // Handle other account updates
                    console.log('Account updated');
                    setPassword('');
                    setEmail('');
                    setVisible(true);
                    setShowModal2(false);
                    setShowModal3(false);
                }
            } else {
                console.log('Error updating account:', response.data);
            }
        } catch (error) {
            Alert.alert('Failed try again later');
            console.error('Error updating account:', error);
        }
    };



    const handleLogout = async () => {
        try {
            console.log('logged out')
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('id');
            await AsyncStorage.removeItem('name');
            navigation.navigate('Home')
        } catch (error) {
            Alert.alert('Failed try again later')
            console.error('log out error', error);
        }
    }

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    const handleCloseModal1 = () => setShowModal1(false);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleCloseModal3 = () => setShowModal3(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };
    const Custommodal = ({ isOpen, handleClose, title, content, action, handler }) => {
        return (
            <Portal>
                <Modal visible={isOpen} onDismiss={handleClose} contentContainerStyle={containerStyle}>
                    <Text style={styles.text} variant="titleMedium">{title}</Text>
                    <Text variant="bodyMedium">{content}</Text>
                    <Button onPress={handleClose} textColor="#77B71C">Cancel</Button>
                    <Button onPress={handler} textColor="#77B71C">{action}</Button>
                </Modal>
            </Portal>
        );
    };
    return (
        <ScrollView>
            <Provider>
                <View style={styles.container}>
                    <Portal>
                        <Snackbar
                            visible={visible}
                            action={{
                            }}>
                            Changed successfully !
                        </Snackbar>
                    </Portal>

                    {token ? (
                        <>
                            {/* user informations - avatar and username */}
                            <View style={styles.rowContainer}>
                                {userPFP && (
                                    <Avatar.Text size={90} label={userData.name} style={{marginTop:25}}/>
                                )}
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={styles.text} variant="bodyMedium">Username</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={userData.name}
                                    />
                                </View>
                            </View>

                            {/* editing email */}
                            <Text style={styles.text} variant="bodyMedium">Email</Text>

                            <View style={styles.rowContainer}>
                                <TextInput
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    style={styles.input}
                                    placeholder={userData.email}
                                />
                                <Button onPress={() => setShowModal1(true)} style={styles.button} textColor="white" >Edit</Button>
                            </View>

                            {/* editing password */}
                            <Text style={styles.text} variant="bodyMedium">Password</Text>

                            <View style={styles.rowContainer}>
                                <TextInput
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    style={styles.input}
                                    placeholder="******"
                                    secureTextEntry={true}
                                />
                                <Button onPress={() => setShowModal2(true)} style={styles.button} textColor="white">Edit</Button>
                            </View>

                            {/* button to delete */}
                            <Text style={styles.text} variant="bodyMedium">Delete my account</Text>
                            <Button onPress={() => setShowModal3(true)} style={styles.buttonD} textColor="white">Delete</Button>

                            <View>
                                <Text style={styles.text} variant="bodyMedium">Logout</Text>
                                <Button onPress={() => handleLogout(token)} style={styles.buttonD} textColor="white">Logout</Button>
                            </View>
                        </>
                    ) : (
                        // Render login button when token is not available
                        <>
                            <View style={styles.UNcontainer}>
                                <View style={styles.inlineContainer}>
                                    <Text variant="bodyLarge" style={{ textAlign: "center", top: 250 }}>Log in to see your</Text>
                                    <Text style={styles.coloredText} variant="bodyLarge"> informations</Text>
                                </View>
                                <Button onPress={() => navigation.navigate('Login')} style={styles.buttonLog} textColor="white">Login</Button>
                            </View>
                        </>
                    )}
                    <Custommodal
                        isOpen={showModal1}
                        handleClose={handleCloseModal1}
                        handler={manageAccount}
                        title="Edit my email"
                        content="This cant be undone."
                        action="Confirm"
                        onChange={handleEmailChange}
                    />
                    <Custommodal
                        isOpen={showModal2}
                        handleClose={handleCloseModal2}
                        handler={manageAccount}
                        title="Edit password"
                        content="This cant be undone. "
                        action="Confirm"
                        onChange={handlePasswordChange}
                    />
                    <Custommodal
                        isOpen={showModal3}
                        handleClose={handleCloseModal3}
                        handler={manageAccount}
                        title="Delete my account"
                        content="Your account will be deleted once and for all. Are you sure you want to delete it ?"
                        action="Delete"
                    />
                </View>
            </Provider>
        </ScrollView>
    );
}

export default Myaccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 15,
    },
    input: {
        height: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        width: 200,
    },
    button: {
        flexDirection: 'row',
        padding: 0,
        paddingHorizontal: 10,
        width: 90,
        height: 38,
        marginLeft: 50,
        backgroundColor: '#77B71C',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonD: {
        flexDirection: 'row',
        padding: 0,
        paddingHorizontal: 10,
        width: 200,
        height: 40,
        marginBottom: 20,
        backgroundColor: '#F6BC2F',
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },


    // not logged part 
    UNcontainer: {
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
        textAlign: "center",
        top: 250
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
    buttonLog: {
        padding: 0,
        paddingHorizontal: 10,
        position: 'absolute',
        width: 177,
        height: 48,
        top: 300,
        marginLeft: 100,
        backgroundColor: '#77B71C',
        justifyContent: "center",
        alignItems: "center",
    },
});
