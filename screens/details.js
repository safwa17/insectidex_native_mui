import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import axios from 'axios';

const Details = ({ route }) => {
  const { id } = route.params;
  const { insectResult } = route.params;
  const [insect, setInsect] = useState([]);

  useEffect(() => {
    const fetchInsect = async () => {
      try {
        let url = `https://laravel.nanodata.cloud/api/insect/${id}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setInsect(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInsect();
  }, [id]);

  return (
    <View style={styles.container}>
      {/* Affichage des détails de l'insecte avec l'id */}
      {id && (
        <View style={styles.card}>
          {insect.length > 0 && (
            <View style={styles.card}>
              {insect.map((insect, index) => (
                <View key={index} style={{marginTop:50}}>
                  <Card>
                  <Card.Cover source= {{ uri: insect['photo'] }} style={{borderRadius:0}} />
                  </Card>
                  <List.Section title="Insect Details">
                    <List.Accordion
                      title="Name"
                      left={(props) => <List.Icon {...props} icon="format-letter-case" />}
                    >
                      <List.Item title={`${insect.nom_commun} also called ${insect.nom_scientifique}.`} />
                    </List.Accordion>
                    <List.Accordion
                      title="Size"
                      left={(props) => <List.Icon {...props} icon="size-xs" />}
                    >
                      <List.Item title={`It's ${insect.taille}.`} />
                    </List.Accordion>
                    <List.Accordion
                      title="Weight"
                      left={(props) => <List.Icon {...props} icon="weight-gram" />}
                    >
                      <List.Item title={`It weights ${insect.poids} grams.`} />
                    </List.Accordion>
                  </List.Section>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
      {/* Affichage des détails de l'insecte après la recherche */}
      {insectResult && (
        <View style={styles.card}>
          <View style={styles.card}>
            {insectResult.length > 0 && (
              <View style={styles.card}>
                {insectResult.map((insect, index) => (
                  <View key={index}>
                    <Card>
                      <Card.Cover source={insectResult.photo} />
                    </Card>
                    <List.Section title="Insect Details">
                      <List.Accordion
                        title="Name"
                        left={(props) => <List.Icon {...props} icon="information" />}
                        titleNumberOfLines={{ numberOfLines: 2 }}                      >
                        <List.Item
                          title={`${insectResult.nom_commun} also called ${insectResult.nom_scientifique} by the scientists.`}
                        />
                      </List.Accordion>

                      <List.Accordion
                        title="Family"
                        left={(props) => <List.Icon {...props} icon="information" />}
                      >
                        <List.Item title={`It belongs to the ${insectResult['famille']} family.`} />
                      </List.Accordion>
                      <List.Accordion
                        title="Size"
                        left={(props) => <List.Icon {...props} icon="information" />}
                      >
                        <List.Item title={`It's ${insectResult.taille} cm.`} />
                      </List.Accordion>
                      <List.Accordion
                        title="Weight"
                        left={(props) => <List.Icon {...props} icon="information" />}
                      >
                        <List.Item title={`It weights ${insectResult.poids} grams.`} />
                      </List.Accordion>
                    </List.Section>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
