import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Alert, CheckBox } from 'react-native';
import * as Yup from 'yup';
import { Title, RadioButton } from 'react-native-paper';

import Screen from '../components/Screen';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import Button from '../components/Button';
import UploadImage from '../components/UploadImage';

import defaultStyles from '../config/styles';
import Text from '../components/Text';
import { ScrollView } from 'react-native-gesture-handler';
import routes from '../navigation/routes';
import { useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
    accountName: Yup.string()
        .required('Please enter Account Holder name')
        .min(3).max(100)
        .label('Account Holder Name'),
    accountNumber: Yup.string()
        .required('Please enter your Account number')
        .length(10)
        .label('Account Number')
});

function BankDetails() {
    const [checked2, setChecked2] = useState(false);
    const navigation = useNavigation();

    const setToggleCheckBox2 = () => {
        setChecked(false);
        setChecked1(false);
        setChecked2(true);
    }

    return(
        <Screen style={styles.container}>
            <Title style={{
                    marginLeft:'10%',
                    borderBottomColor:'#2ccce4',
                    borderBottomWidth:1.5,
                    width:'36%'}}>BANK DETAILS</Title>
            <Form
                initialValues={{
                    accountName: '',
                    accountNumber: '',
                }}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                validationSchema={validationSchema}
            >
                <ScrollView>
                    <View style={{marginLeft:'12%',marginRight:'5%',width:'75%'}}>
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            name="accountName"
                            placeholder="Account Holder's name"
                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            name="phoneNumber"
                            placeholder="Account Number"
                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            name="checkedCheque"
                            placeholder="Cancelled Cheque"
                        />
                    </View>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:'5%',marginLeft:'12%',marginBottom:'5%'}}>
                            <RadioButton
                                value="first"
                                status={ checked2 === 'first' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked2('first')}
                                color="orange"
                            />
                            <Text style={styles.checkBoxText}>I'll update it later</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Button
                                onPress={() => navigation.navigate(routes.CREATESHOP)}
                                title="Continue"
                                style={{ width: "50%",borderRadius:25}}
                            />
                            {/* <SubmitButton title="Continue"/> */}
                        </View>
                    </View>

                </ScrollView>
            </Form>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    checkBoxText: {
        fontSize:15
    }
})

export default BankDetails;
