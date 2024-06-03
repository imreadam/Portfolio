import * as React from 'react';
import { Button, View, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Proba from "./Proba";
import Getes from "./Getes";
import Lenyilo from "./Lenyilo";
import FelvitelAdam from "./FelvitelAdam";
import Getesorokbefogadas from "./Getesorokbefogadas";
import Kozosscreen from './Kozosscreen';
import Ujlap from "./Ujlap";
import Video from "./Video";
import Ujlapfelhasznalo from "./Ujlapfelhasznalo";
import Orokbefogadasfelulet from "./Orokbefogadasfelulet";


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{height:400,width:390}}>
        <Video/>
      </View>
      
    </View>
  );
}



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root ({ navigation})
{
  return(

      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name='FelvitelA' component={FelvitelAdam}/>
        <Drawer.Screen name='KozosscreenA' component={Kozosscreen}/>
        <Drawer.Screen name='GetesorokbefogadasA' component={Getesorokbefogadas}/>
        
      </Drawer.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Root" component={Root} options={{headerShown:false}} />
        <Stack.Screen name="Ujlap" component={Ujlap} />
        <Stack.Screen name="Ujlapfelhasznalo" component={Ujlapfelhasznalo} />
        <Stack.Screen name='Orokbefogadasfelulet' component={Orokbefogadasfelulet}/>
      </Stack.Navigator>

    </NavigationContainer>

    
  );
}