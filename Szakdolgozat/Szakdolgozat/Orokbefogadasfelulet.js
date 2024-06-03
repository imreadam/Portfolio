import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button } from 'react-native';
import Ipcim from './Ipcim';

const Orokbefogadasfelulet = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { atkuld21, atkuld22 } = route.params;

  const getMovies = async () => {
    try {
      var adatok2 = {
        "atkuld21": atkuld21
      };

      const response = await fetch(Ipcim.Ipcim + '/allatkiiras', {
        method: "POST",
        body: JSON.stringify(adatok2),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const kattintas = async () => {
    var adatok2 = {
      "atkuld21": atkuld21,
      "atkuld22": atkuld22
    };
    try {
     
      const response = await fetch(Ipcim.Ipcim + '/orokbefelvitel', {
        method: "POST",
        body: JSON.stringify(adatok2),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      const result = await response.text();
      try {
     
        const response2 = await fetch(Ipcim.Ipcim + '/orokbefelvitelupdate', {
          method: "POST",
          body: JSON.stringify(adatok2),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        });
  
        const result2 = await response2.text();
        
        //console.log(result);
        // Kezeld itt a v?laszt, ha sz?ks?ges
      } catch (error) {
        console.error('Hiba történt az örökbefogadás során!:', error);
      }
      //console.log(result);
      // Kezeld itt a v?laszt, ha sz?ks?ges
    } catch (error) {
      console.error('Hiba történt az örökbefogadás során!:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 150 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={{
              flexDirection: 'column',
              marginTop: 10,
              borderLeftColor: 'blue',
              borderRightColor: 'blue',
              borderLeftWidth: 7,
              borderRightWidth: 7,
              padding: 15,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              borderBottomStartRadius: 30,
              borderBottomEndRadius: 30
            }}>
              <Image source={{ uri: Ipcim.Ipcim + item.allatok_kep }} style={{ width: 300, height: 300, margin: 'auto', borderWidth: 4, borderColor: 'blue', borderRadius: 3 }} />
              <Text>
                {item.allatok_nev}
              </Text>
              <Text>
                {item.allatok_leiras}
              </Text>
            </View>
          )}
        />
      )}
      <Button onPress={kattintas} title="Örökbefogadom!" />
    </View>
  );
};

export default Orokbefogadasfelulet;