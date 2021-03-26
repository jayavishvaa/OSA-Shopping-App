import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import colors from '../config/colors';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [Upload, setUpload] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async (value) => {
    setUpload(value);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{width:'100%'}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        {!Upload && <Text style={{marginRight:'5%'}}>Upload Your Signature</Text>}
        {Upload && image && <Image source={{ uri: image }} style={{ width: 175, height: 125, marginRight:'5%',marginLeft:'10%'}} />}
        <TouchableOpacity 
          onPress={pickImage}
          style={{borderRadius:10,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  marginVertical: 50,
                  width:'33%',
                  borderWidth:1,
                }}>
          <Text  style={{fontSize: 11}}>SIGNATURE</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}