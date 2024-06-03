import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_elveszett = async () => {
    try {
      const response = await fetch(IP.Ipcim +'elveszett');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    letolt_elveszett();
  }, []);

  const torles = (szam) => {
    //alert(szam)
    const confirmed = window.confirm('Biztosan törölni szeretnéd ezt az elemet?');
    if (confirmed) {
      var bemenet = {
        bevitel1: szam
      };

      fetch(IP.Ipcim + 'torles_elveszett', {
        method: 'DELETE',
        body: JSON.stringify(bemenet),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then((x) => x.text())
        .then((y) => {
          alert(y);
          letolt_elveszett();
        });
    }
  };

  return (
    
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        
        <FlatList
        
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={{backgroundColor:'grey', padding:5, borderRadius:30, margin:10}}>
            <View style={{flexDirection:'row' }}>
              <View style={{flex:4, alignContent:'center', paddingTop:160, paddingBottom:160}}>
            <Text style={{fontSize:50, backgroundColor:'white',  borderRadius:20}}>
              {item.elveszett_szoveg}
            </Text>
            </View>
            <View style={{flex:4, alignContent:'center', margin:10}}>
            <Image source={{ uri: "http://nodejs2.dszcbaross.edu.hu:22004/kepek/"+item.elveszett_kep }} style={{ width: 300, height: 300, margin: 'auto', borderWidth: 4, borderColor: 'blue', borderRadius: 3 }} />
            </View>
            <View style={{flex:4, alignItems:'center', paddingTop:160, paddingBottom:160}}>
            <TouchableOpacity
        style={{backgroundColor:'blue',width:200, alignItems:'center', borderBottomEndRadius:40, borderTopStartRadius:40}}
        onPress={async ()=>torles(item.elveszett_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:50}}  >Törlés!</Text>
      </TouchableOpacity>
      </View>

            </View>
            </View>
          )}
          
        />
        
      )}

    </View>
  );
};

export default App;