import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View, Alert, RefreshControl } from 'react-native';
import * as Yup from 'yup';
import * as Location from "expo-location";
import { Title } from 'react-native-paper';
import Screen from '../components/Screen';
import defaultStyles from '../config/styles';
import Text from '../components/Text';
import routes from '../navigation/routes';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import useAuth from '../auth/useAuth';
import locationApi from '../api/location';
import registerSeller from '../api/registerSeller';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Please enter your full name')
        .min(3).max(100)
        .label('Full Name'),
    email: Yup.string()
        .email()
        .required('Please enter your Email'),
    homeAddress: Yup.string()
        .required('Please provide your Flat No. / House No. / Street Name')
        .min(5).max(255)
        .label('Flat No. / House No. / Street Name'),
    pinCode: Yup.string()
        .matches(/^\d{6}$/).length(6, 'Please enter a valid area pin code')
        .required('Please provide your area pin code')
        .label('Pin Code'),
    city: Yup.string()
        .min(3).max(50)
        .required('Please provide your city name')
        .label('City')
});

function Register({navigation}) {
    const auth = useAuth();
    const [address, setAddress] = useState([]);
    const [acquiringLocation, setAcquiringLocation] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const [locationError, setLocationError] = useState(false);

    // const getLocation = async () => {
    //     try {
    //         const gpsServiceStatus = await Location.hasServicesEnabledAsync();
    //         if (gpsServiceStatus) {
    //             const { status } = await Location.requestPermissionsAsync();
    //             if (status !== 'granted') return setLocationError(true);
    //             setLocationError(false);
    //             setAcquiringLocation(true);
    //             const location = await Location.getCurrentPositionAsync();
    //             const result = await locationApi.location({
    //                 latitude: location.coords.latitude,
    //                 longitude: location.coords.longitude
    //             });
    //             if (!result.ok) return setLocationError(true);
    //             setLocationError(false);
    //             setAddress(result.data[0]);
    //             setAcquiringLocation(false);
    //         } else {
    //             console.log("access to location not granted");
    //             setLocationError(true);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }
    const onRefresh = () => {
        setRefreshing(true);
        // getLocation();
        setRefreshing(false);
    }

    // useEffect(() => {
    //     getLocation();
    //   }, []);

    const handleSubmit = async formData => {
        const user = auth.user;
        const dataToSend = { ...formData, _id: user._id };
        const result = await registerSeller.registerSeller(dataToSend);
        if (!result.ok) return setError(true);
        setError(false);
        auth.logIn(result.data);
    }
    
  return(
    <Screen>
        <View style={styles.container}>
            {/* {acquiringLocation && <Text style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.5)'
            }}>Acquiring location...</Text>}
            {locationError && <Text style={styles.locationError}>Couldn't retrieve your Location, make sure you have given required permissions or your device location is active</Text>} */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {/* <Image style={styles.sellerImage} source={require('../assets/sellerDetailsIcon.png')}/> */}
                <Title style={styles.personalDetailsText}>PERSONAL</Title>
                <Form
                    initialValues={{
                        fullName: '',
                        email: '',
                        homeAddress: address ? address.streetName : '',
                        pinCode: address ? address.zipcode : '',
                        city: address ? address.city : '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error="Something went wrong" visible={error}/>
                    <View style={{marginLeft:'10%'}}>
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="account"
                        keyboardType="default"
                        name="fullName"
                        width="90%"
                        placeholder="Your full name"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="default"
                        name="email"
                        width="90%"
                        placeholder="Your Email"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="home"
                        keyboardType="default"
                        name="address"
                        name="homeAddress"
                        width="90%"
                        placeholder="Flat no. / House no. / Street Name"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="map-marker"
                        keyboardType="number-pad"
                        name="pinCode"
                        width="90%"
                        placeholder="Area pin code"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="home-city"
                        keyboardType="default"
                        name="city"
                        width="90%"
                        placeholder="City"
                    />
                    </View>
                    <SubmitButton title="Register" onPress={() => navigation.navigate(routes.BUSSINESSDETAILS)} style={{width:'40%',borderRadius:25,backgroundColour:'#2ccce4',alignSelf:'center'}}/>
                </Form>
                <Text>{`\n \n \n \n \n \n \n `}</Text>
            </ScrollView>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 10
  },
  locationError: {
    textAlign: 'center',
    color: 'rgba(255,0,0,0.4)'
  },
  personalDetailsText: {
    marginLeft:'10%',
    borderBottomColor:'#2ccce4',
    borderBottomWidth:1.5,
    width:'28%'
  },
  registerText: {
      color: defaultStyles.colors.medium,
      fontSize: 30,
      alignSelf: 'center'
  },
  sellerImage: {
      width: "100%",
      resizeMode: 'contain',
      height: 200,

  }
});

export default Register;