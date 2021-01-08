import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';

import Screen from '../components/Screen';
import Text from '../components/Text';
import defaultStyles from '../config/styles';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import useLocation from '../hooks/useLocation';
import LandingPage from './LandingPage';
import routes from '../navigation/routes';
import authStorage from '../auth/storage';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter your name').min(3).max(100).label('Your Name'),
    homeAddress: Yup.string().min(5, 'Please enter a valid address').max(255, 'Characters limit exceeded'),
    landmark: Yup.string().min(3).default(''),
    city: Yup.string().min(3).required(),
    pinCode: Yup.string().required('Please enter your 6 digit area PIN code').length(6, 'Please enter a valid PIN code of your area').matches("\\d{6}", 'Please enter a valid PIN code of your area'),
})

function Register({navigation}) {
    const registerApi = useApi(usersApi.register);
    const [error, setError] = useState();

    const token = authStorage.getToken();
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  
    const handleSubmitDetails = async userInfo => {
        const data = {...userInfo, phoneNumber: decodedToken.phoneNumber}
        console.log(data);
        const result = await registerApi.request(data);
        console.log(result);

        if (!result.ok) {
            if (result.data) setError(result.data.error);
            else {
                setError("An unexpected error occurred.");
                console.log(result);
            }
            return;
        }
        navigation.navigate(routes.LANDINGPAGE);
    }

    const handleSkipForNow = async () => {

    }

    const handleGetAddress = async () => {
        // if (!location) return;
        // setLocationProvided(true);
        // console.log(location);
        // try {
        //     const result = await Geocoder.from(location.coords.latitude, location.coords.longitude);
        //     console.log(result);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <>
        {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
        <Screen>
            <ScrollView>
            <Text style={styles.registerText}>Register</Text>
            <View style={styles.form}>
            <View style={styles.formField}>
            <Form
                initialValues={{ fullName: '', homeAddress: '', landmark: '', city: '', pinCode: '' }}
                onSubmit={handleSubmitDetails}
                validationSchema={validationSchema}
            >
                <ErrorMessage error="Invalid Phone Number" visible={error}/>
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    name="fullName"
                    icon="account"
                    placeholder="Your Full Name"
                />
                <FormField
                    autoCapitalize="none"
                    maxlength={255}
                    multiline
                    numberOfLines={2}
                    icon="home"
                    autoCorrect={false}
                    keyboardType="default"
                    name="homeAddress"
                    default={``}
                    placeholder="Your Home Address"
                />
                <FormField
                    autoCapitalize="none"
                    maxlength={50}
                    icon="alpha-l-box"
                    autoCorrect={false}
                    keyboardType="default"
                    name="landmark"
                    placeholder="Landmark"
                />
                <FormField
                    autoCapitalize="none"
                    maxlength={50}
                    icon="home-city"
                    autoCorrect={false}
                    keyboardType="default"
                    name="city"
                    placeholder="City"
                />
                <FormField
                    autoCapitalize="none"
                    maxlength={50}
                    icon="map-marker"
                    autoCorrect={false}
                    keyboardType="default"
                    name="pinCode"
                    placeholder="Area PIN code"
                />
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity onPress={handleGetAddress}>
                    <Text style={styles.useMyLocation}>Use my current location</Text>
                </TouchableOpacity>
                <SubmitButton title="Register" />
            </Form>
            </View>
            <Text style={styles.orText}>or</Text>
            <TouchableOpacity onPress={handleSkipForNow}>
                <Text style={styles.skipForNow}>Skip for now</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    registerText: {
        color: defaultStyles.colors.medium,
        fontSize: 50,
        marginTop: '10%',
        marginLeft: 15
    },
    form: {
        margin: 10,
        marginTop: '12%'
    },
    formField: {
        backgroundColor: defaultStyles.colors.light,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    orText: {
        alignSelf: 'center',
        color: defaultStyles.colors.medium
    },
    skipForNow: {
        alignSelf: 'center',
        color: defaultStyles.colors.primary,
        marginTop: '5%',
        marginBottom: '5%'
    },
    useMyLocation: {
        alignSelf: 'center',
        marginBottom: 20,
        color: 'green'
    }
})

export default Register;