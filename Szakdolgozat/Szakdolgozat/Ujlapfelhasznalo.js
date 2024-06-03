import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,FlatList,Image,Button } from 'react-native';
import Ipcim from './Ipcim';

const Ujlapfelhasznalo = ({route, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {atkuld11,atkuld12} =route.params
    const [felulnev, setFelulnev] = useState([]);
    const [felultelefon, setFelultelefon] = useState([]);
    const [felulemail, setFelulemail] = useState([]);


    const getMovies = async () => {
        //alert(atkuld1)
        try {
            var adatok ={
                "atkuld11":atkuld11
            }
          const response = await fetch(Ipcim.Ipcim+'/keresfelhasznalo' ,{
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          
          const json = await response.json();
          setData(json);
          setFelulnev(json[0].felhasznalo_teljesnev)
          setFelultelefon(json[0].felhasznalo_telefon)
          setFelulemail(json[0].felhasznalo_email)
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
    <View style={{flex: 1, padding: 10}}>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <View style={{flex:1}}>
        <View style={{borderColor:'blue',borderWidth:4,padding:5,borderRadius:10}}>
        <View style={{borderBottomColor:'blue',borderBottomWidth:10,borderBottomStartRadius:12,borderBottomEndRadius:12,borderTopColor:'blue',borderTopWidth:7,borderTopStartRadius:12,borderTopEndRadius:12}}>
        <Text style={{fontSize:40}}>
          {felulnev}
        </Text>
        </View>
        
        <View style={{borderBottomColor:'blue',borderBottomWidth:7,borderBottomStartRadius:12,borderBottomEndRadius:12}}>
        <Text style={{fontSize:28,fontWeight:'bold'}}>Elérhetőségek: </Text>
        <View>
          <Text style={{fontSize:23,fontStyle:'italic'}}>
          Telefon:
          </Text>
          <Text style={{fontSize:20,borderBottomColor:'blue',borderBottomWidth:1}}>
          {felultelefon}
          </Text>
           
        </View>
        <View style={{marginBottom:5}}>
          <Text style={{fontSize:23,fontStyle:'italic'}}>
          Email: 
          </Text>
          <Text style={{fontSize:20,borderBottomColor:'blue',borderBottomWidth:1}}>
          {felulemail}
          </Text>
          
        </View>
        </View>
        </View>

              

      <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
            <View style={{flexDirection:'column',marginTop:10,borderLeftColor:'blue',borderRightColor:'blue',borderLeftWidth:7,borderRightWidth:7,padding:7,borderTopRightRadius:30,borderTopLeftRadius:30,borderBottomStartRadius:30,borderBottomEndRadius:30}}>
              <View style={{flex:4, alignItems:'center'}}>
                    <Image source={{uri:Ipcim.Ipcim+item.allatok_kep}} style={{width:300,height:300,margin:'auto',borderWidth:4,borderColor:'blue',borderRadius:3}} /> 
              </View>
                  <View style={{flex:4}}>
                  <Text>
                    {item.allatok_nev}
                  </Text>
                  </View>
                  <View style={{flex:4}}>
                  <Text>
                    {item.allatok_leiras}
                  </Text>
                  </View>
                  <View style={{flex:4}}>
                  <Text>
                    {item.orokbefogadas_datum}
                  </Text>
                  </View>
                  <View>
                    {item.allatok_orokbefogadas === 0    ?
                    <Button onPress={() => navigation.navigate('Orokbefogadasfelulet', {atkuld21:item.allatok_id,atkuld22:item.felhasznalok_id})} title="Örökbefogadás!"/>
                    : 
                    ""
                    }
                  </View>
                  
                  
                
            </View>
          
          
        )}
      />

      
      </View>
    )
    }
    
    <Button onPress={() => navigation.navigate('Felhasználók')} title="Vissza a Felhasználókhoz"/>  
  </View>
  );
};



export default Ujlapfelhasznalo;