import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const Video = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
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
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Image
                  style={{width:250, height:150, alignSelf: 'center', marginTop:-150 }}
                  source={{ uri: `http://nodejs2.dszcbaross.edu.hu:22004/kepek/Logo.png` }}
                />
      )}

      <WebView 
       
      style={{flex: 1, width: '100%', height: '100%', alignSelf: 'center', margin:10, paddingTop:100, marginBottom:100}}
      allowsFullscreenVideo
      source={{ uri: 'https://www.youtube.com/embed/JjmVg24EYeU?si=SwHl0Ix6EVp5VjdQ' }}
         />
    </View>
  );
};

export default Video;