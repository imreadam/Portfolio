import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View} from 'react-native';
import Ipcim from './Ipcim';

const Kozosscreen= ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+'/lenyilolista');
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
            <View style={{flexDirection:'row'}}>
              <View style={{flex:3}}>
                <Text style={{textAlign:'center',fontSize:30}}>
                  {item.telepules_nev}
                </Text>
              </View>
            <View style={{flex:3}}>
                <Button  onPress={() => navigation.navigate('Megye Menhelyei', {atkuld1:item.telepules_id,atkuld2:item.telepules_nev})} title="R�szletek" />
            </View>
            
        
            </View>
          )}
        />
      )}
      
    </View>
  );
};

export default Kozosscreen;