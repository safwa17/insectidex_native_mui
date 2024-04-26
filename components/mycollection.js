import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Card, Text, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mycollection = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState("");
    console.log(token);

    {/* insects collection of user displayed in cards */ }
    const [insects, setInsects] = useState([]);

    // navigation à l'ecran detail avec l'id de l'insect cliqué
    const handleButtonClick = (id) => {
        navigation.navigate('Detail', { id: id })
    }

    useEffect(() => {
        const url = `https://laravel.nanodata.cloud/api/insects/user/`;
        const fetchInsects = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setToken(token);
                const response = await axios.get(url,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                if (response.status === 200) {
                    setInsects(response.data.insects);
                    console.log(response.data);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchInsects();

    }, []);

    useEffect(() => {
        console.log(insects);
    }, [insects]);

    if (token && !insects.length) {
        console.log("here", insects)
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} color={MD2Colors.lime700} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                {!insects.length && (
                    <Text variant="bodyMedium" style={{ textAlign: 'center', justifyContent: 'center', top: 300 }}>You have no insects yet !</Text>
                )}
                <View style={styles.card}>
                    {insects.length > 0 && insects.map((insect, index) => (
                        <Card key={index} style={styles.card}>
                            <Card.Title titleVariant="titleLarge" title={insect.nom_commun} style={{ marginTop: 10 }} />
                            <Card.Content>
                                <Text variant="bodyMedium" style={{ marginBottom: 10 }}>{insect.nom_scientifique} weights grams {insect.poids} and is {insect.taille}</Text>
                            </Card.Content>
                            <Card.Cover source={{ uri: insect['photo'] }} style={{ borderRadius: 0 }} />
                            <Card.Actions>
                                <Button onPress={() => handleButtonClick(insect.id)} textColor="#77B71C" style={{ backgroundColor: "white", borderColor: "white" }}>
                                    View Details
                                </Button>
                            </Card.Actions>
                        </Card>
                    ))}
                </View>

            </View>
        </ScrollView>

    )
}

export default Mycollection

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    card: {
        marginVertical: 20,
        marginBottom: 30,
        backgroundColor: "white",
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    input: {
        height: 40,
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#E8E8E8',
        width: 100,
    },
    button: {
        flexDirection: 'row',
        padding: 0,
        paddingHorizontal: 10,
        width: 100,
        height: 48,
        marginLeft: 50,
        backgroundColor: '#77B71C',
    },
    buttonD: {
        flexDirection: 'row',
        padding: 0,
        paddingHorizontal: 10,
        width: 100,
        height: 48,
        backgroundColor: '#F6BC2F',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
})