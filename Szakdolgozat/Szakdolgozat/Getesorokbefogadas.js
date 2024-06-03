import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View,Button} from 'react-native';
import Ipcim from './Ipcim';


const Getesorokbefogadas = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+'/lenyilolista2');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View>
            <Text style={{textAlign:'center',fontSize:30}}>
              {item.felhasznalo_teljesnev}
            </Text>
            <View style={{width:200,marginLeft:80,marginRight:80}}>
                <Button  onPress={() => navigation.navigate('Profil', {atkuld11:item.felhasznalok_id,atkuld12:item.felhasznalo_teljesnev})} title="Felhasználó profil megtekintése" />
            </View>

                
                
             
            </View>
           
             
          )}
        />
      )}
    </View>
  );
};

export default Getesorokbefogadas;