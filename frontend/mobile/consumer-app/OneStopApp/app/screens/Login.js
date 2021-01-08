import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import sendOTP_Api from "../api/sendOTP";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import defaultStyles from '../config/styles';
import Text from '../components/Text';
import routes from '../navigation/routes';
import authStorage from '../auth/storage';

const phoneNumbervalidationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Please enter your mobile number').length(10).label('Phone Number')
});

const otpValidationSchema = Yup.object().shape({
    otp: Yup.string().length(6).required('Please enter OTP').label('OTP')
})


function Login({ navigation }) {
    // const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [OTPSend, setOTPSend] = useState(false);

    const handleSubmitPhoneNumber = async ({phoneNumber}) => {
        const result = await sendOTP_Api.sendOTP(phoneNumber);
        console.log(result);
        if (!result.ok) return setLoginFailed(true);

        setOTPSend(true);
    }

    const handleSubmit = async ({ phoneNumber, otp }) => {
        try {
            const result = await authApi.login({phoneNumber, otp});
            console.log(result.data);
            if (!result.ok) return setLoginFailed(true);
            
            setLoginFailed(false);
            await authStorage.storeToken(result.data);
            navigation.navigate(routes.REGISTER);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Screen style={styles.container}>
            <Image style={styles.phoneImg} source={require('../assets/phone.png')} />
            <View style={styles.formField}>
            <Form
                initialValues={{ phoneNumber: '', otp: '' }}
                onSubmit={(OTPSend && handleSubmit) || handleSubmitPhoneNumber}
                validationSchema={(OTPSend && phoneNumbervalidationSchema && otpValidationSchema) || phoneNumbervalidationSchema}
            >
                <ErrorMessage error="Something went wrong" visible={loginFailed}/>
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="phone"
                    keyboardType="number-pad"
                    name="phoneNumber"
                    placeholder="Your Phone Number"
                />
                {!OTPSend && <SubmitButton style={styles.submitPhoneNumberButton} title="Send OTP" />}
                {OTPSend && <>
                    <View style={styles.otpInput}>
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="phone-message"
                            keyboardType="number-pad"
                            name="otp"
                            placeholder="Enter 6 digit OTP"
                        />
                        <TouchableOpacity style={styles.resendOTP}>
                            <Text style={styles.resendOTPText}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <SubmitButton style={styles.submitOTPButton} title="Login"/>
                        </>
                }
            </Form>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    phoneImg: {
        height: '40%',
        width: '80%',
        alignSelf: 'center'
    },
    formField: {
        alignItems: 'flex-end',
        marginTop: 50,
        marginHorizontal: 12,
    },
    submitPhoneNumberButton: {
        width: '50%',
        marginRight: 20
    },
    otpInput:{
        flexDirection: 'row',
        width: '50%',
        alignSelf: 'flex-start'
    },
    resendOTP: {
        alignSelf: 'center',
        marginLeft: '25%'
    },
    resendOTPText: {
        fontSize: 16,
        color: defaultStyles.colors.medium
    }
})

export default Login;
