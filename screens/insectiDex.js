import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Searchbar } from 'react-native-paper';
import axios from 'axios';

const InsectiDex = () => {
    const [search, setSearch] = useState('');
    const [insects, setInsects] = useState([]);
    const navigation = useNavigation();


    const handleButtonClick = (id) => {
        navigation.navigate('Detail', { id: id })
    };

    let url = 'https://laravel.nanodata.cloud/api/insects';

    const fetchInsects = async () => {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setInsects(response.data);
                console.log(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchSearchedInsects = async () => {
        let searchurl = 'https://laravel.nanodata.cloud/api/search';
        try {
            const response = await axios.get(`${searchurl}?search=${search}`);
            if (response.status === 200) {
                setInsects(response.data);
                console.log(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    };
    console.log(search);

    useEffect(() => {
        if (search) {
            fetchSearchedInsects(search);
        } else {
            fetchInsects();
        }
    }, [search]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.search}>
                <Searchbar
                    placeholder="Search"
                    value={search}
                    onChangeText={text => setSearch(text)}
                    inputStyle={{ color: '#77B71C' }}
                    style={{ backgroundColor: '#FFFFFF' }}
                />
            </View>

            <View style={styles.card}>
                {insects.map((insect, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Title titleVariant="titleLarge" title={insect.nom_commun} style={{marginTop:10}} />
                        <Card.Content>
                            <Text variant="bodyMedium" style={{marginBottom:10}}>{insect.nom_scientifique} weights grams {insect.poids} and is {insect.taille} cm</Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: insect['photo'] }} style={{borderRadius:0}} />
                        <Card.Actions>
                            <Button onPress={() => handleButtonClick(insect.id)} textColor="#77B71C" style={{ backgroundColor: "white" ,borderColor:"white"}}>
                                View Details
                            </Button>
                        </Card.Actions>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
};

export default InsectiDex;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        marginVertical: 20,
        marginBottom: 30,
        backgroundColor: "white",
    }
});
