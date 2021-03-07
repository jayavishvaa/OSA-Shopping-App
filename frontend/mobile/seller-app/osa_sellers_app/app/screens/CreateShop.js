import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image,ScrollView,StatusBar,TouchableOpacity } from 'react-native';
import * as Yup from "yup";
import * as Location from "expo-location";
import { FontAwesome } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import CategoryPickerItem from '../components/CategoryPickerItem';
import {
    ErrorMessage,
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
    FormImagePicker
  } from "../components/forms";
import UploadScreen from './UploadScreen';
import locationApi from '../api/location';
import useAuth from '../auth/useAuth';
import shopsApi from '../api/shops';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
    shopName: Yup.string().required("Please provide your shop name").min(3).max(100).label("Shop Name"),
    description: Yup.string().label("Description"),
    streetName: Yup.string().max(255).required("Please provide this"),
    pinCode: Yup.string().length(6).required().matches(/^\d{6}$/),
    sections: Yup.object().required().nullable().label("Sections"),
    fullName: Yup.string(),
    homeAddress: Yup.string(),
    landmark: Yup.string()
    
    // images: Yup
    // .array()
    // .min(1, "Please select at least one image / logo.")
    // .max(4, "Please give max 4 image")
    // .label("Shop Images"),

    // shopName: Joi.string().min(3).max(100).required(),
    // description: Joi.string().max(255),
    // streetName: Joi.string().max(255).required(),
    // pinCode: Joi.string().length(6).required().$_match(/^\d{6}$/),
    // locationCoordinates: Joi.object().required(),
    // seller: Joi.objectId().required(),
    // sections: Joi.array().required()
  });

function CreateShop({ navigation }) {
    const auth = useAuth();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [acquiringLocation, setAcquiringLocation] = useState(false);
    const [address, setAddress] = useState();
    const [locationEnable, setLocationEnable] = useState(true);
    const [locationCoords, setLocationCoords] = useState();
    const [locationError, setLocationError] = useState(false);

const getLocation = async () => {
    try {
        const gpsServiceStatus = await Location.hasServicesEnabledAsync();
        if (gpsServiceStatus) {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') return setLocationError(true);
            setLocationError(false);
            setAcquiringLocation(true);
            const location = await Location.getCurrentPositionAsync();
            setLocationCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            const result = await locationApi.location(locationCoords);
            if (!result.ok) {
                setLocationError(true);
                setAcquiringLocation(false);
                return;
            }
            setLocationError(false);
            setAddress(result.data[0]);
            setAcquiringLocation(false);
            setLocationEnable(true);
        } else {
            setLocationEnable(false);
        }
      } catch (error) {
        console.log(error);
      }
}

useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = async shopData => {
    setUploadVisible(true);
    const sellerId = auth.user._id;
    const dataToSend = {
        shopName: shopData.shopName,
        description: shopData.description,
        streetName: shopData.streetName,
        pinCode: shopData.pinCode,
        sections: shopData.sections.label,
        locationCoords,
        sellerId
    }
    const result = await shopsApi.createShop(dataToSend,
        (progress) => setProgress(progress)   
    );
    if (!result.ok) {
        setUploadVisible(false);
        return alert("Couldn't create your shop this time, retry after sometime....");
    }
    auth.logIn(result.data);
    navigation.navigate(routes.MYSHOP);
  }

  const sections = [
    {
      backgroundColor: "#fc5c65",
      icon: "shopping",
      label: "Grocery",
      value: 1,
    },
    {
      backgroundColor: "#fd9644",
      icon: "medical-bag",
      label: "Medical",
      value: 2,
    },
    {
      backgroundColor: "#fed330",
      icon: "chair-rolling",
      label: "Salon",
      value: 3,
    },
    {
      backgroundColor: "#26de81",
      icon: "wrench",
      label: "Repairs",
      value: 4,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "monitor-cellphone",
      label: "Electronics",
      value: 5,
    },
    {
      backgroundColor: "#45aaf2",
      icon: "account-tie",
      label: "Free-lancing",
      value: 6,
    },
  ];

  return(
      <Screen>
        <UploadScreen
            onDone={() => setUploadVisible(false)}
            progress={progress}
            visible={uploadVisible}
        />
        <Header/>
        {uploadVisible && progress < 1 && <Text style={{
            textAlign: 'center',
            color: 'darkgreen'
        }}>{`Uploading... ${progress}`}</Text>}
        {progress === 1 && <Text style={{
            textAlign: 'center',
            color: 'darkgreen'
        }}>Uploaded successfully...</Text>}
        <View style={styles.container}>
            {acquiringLocation && <Text style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.5)'
            }}>Acquiring Location...</Text>}
            {locationError && <Text style={{
                textAlign: 'center',
                color: 'rgba(255,0,0,0.5)'
            }}>Couldn't retrieve location, please give the required permissions</Text>}
            {!locationEnable && <Text style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.5)'
            }}>Please enable location...</Text>}
            {(locationError || !locationEnable) && <FontAwesome
                name="repeat"
                style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    right: '5%',
                    top: 10
                }}
                onPress={getLocation}
                size={24}
                color="gray"
            />}
            <View style={{width: '100%',height: '58%'}}>
            <Form
                initialValues={{
                    shopName: '',
                    description: '',
                    streetName: address ? address.streetName : '',
                    pinCode: address ? address.zipcode : '',
                    sections: null,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error="Something went wrong" visible={false}/>
                {/* <FormImagePicker name="images" />
                <Text style={{
                color: 'rgba(0,0,0,0.5)',
                marginLeft: '5%'
                }}>Logo or Images of your shop</Text> */}
                <FormField
                    icon="shop"
                    name="shopName"
                    placeholder="Shop Name"
                />
                <FormField
                    icon="card-bulleted-settings"
                    name="description"
                    placeholder="Description (optional)"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="home"
                    keyboardType="default"
                    name="streetName"
                    placeholder={(address && address.streetName !== '') ? address.streetName : "Shop no. / Floor no. / Street name"}
                />
                <View style={{
                    width: '100%',
                    flexDirection: 'row'
                }}>
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="map-marker"
                    keyboardType="number-pad"
                    name="pinCode"
                    width="40%"
                    placeholder="Area pin code"
                />
                <View style={{
                    width: '50%',
                    marginLeft: '5%'
                }}>
                <TouchableOpacity style={{}}>
                <Picker
                    items={sections}
                    name="sections"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Sections"
                    width="100%"
                    
                />
                </TouchableOpacity>
                </View>
                </View>
                {/* {!locationError && <SubmitButton title="Create"/>} */}
                <SubmitButton title="Create"/>
            </Form>
            </View>
      </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      padding: 10,
      paddingTop: StatusBar.currentHeight,
  }
});

export default CreateShop;
