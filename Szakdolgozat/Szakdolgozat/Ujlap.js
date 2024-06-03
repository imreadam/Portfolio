import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,FlatList,Image,Button } from 'react-native';
import Ipcim from './Ipcim';

const Ujlap = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {atkuld1,atkuld2} =route.params


    const getMovies = async () => {
        //alert(atkuld1)
        try {
            var adatok ={
                "atkuld1":atkuld1
            }
          const response = await fetch(Ipcim.Ipcim+'/keresvaros' ,{
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
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
            <View style={{flexDirection:'column'}}>
              <View style={{borderBottomWidth:20,borderLeftWidth:20,borderRightWidth:20,borderColor:'darkblue',borderBottomStartRadius:100,borderBottomEndRadius:100}}>
              <Text style={{color:'white',backgroundColor:'darkblue',textAlign:'center',fontSize:40,fontStyle:'italic'}}>{item.menhely_nev}</Text>

              </View>
              <View style={{flex:4,borderBottomColor:'blue',borderBottomWidth:2}}>
                <Text style={{fontSize:15}}>Telep�l�s</Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>
                {item.telepules_nev}
                </Text>
              </View>
              <View style={{flex:4,borderBottomColor:'blue',borderBottomWidth:2}}>
                <Text style={{fontSize:15}}>Menhely email</Text>
              <Text style={{fontSize:20,fontWeight:'bold'}} >{item.mehely_email}</Text>
              </View>
              <View style={{flex:4,borderBottomColor:'blue',borderBottomWidth:2}}>
                <Text style={{fontSize:15}}>Menhely telefonsz�m</Text>
              <Text style={{fontSize:20,fontWeight:'bold'}}>{item.menhely_telefonszam}</Text>
              </View>
              <View style={{flex:4,borderBottomColor:'blue',borderBottomWidth:2}}>
                <Text style={{fontSize:15}}>Menhely c�me</Text>
              <Text style={{fontSize:20,fontWeight:'bold'}}>{item.menehely_cim}</Text>
              </View>
              <View style={{flex:4,alignItems:'center',marginTop:5, marginBottom:5}}>
                <Image source={{uri:Ipcim.Ipcim+item.menhelyek_kep}}  style={{width:300,height:300,margin:'auto',borderWidth:4,borderColor:'blue',borderRadius:3}} /> 
              </View>
              
                
                
            </View>
            
          
          
        )}
      />
      
    )}
    <Button onPress={() => navigation.navigate('Megyék Menhely Keresés')} title="Vissza a v�laszt� fel�letre!" />  
  </View>
  );
};



export default Ujlap;