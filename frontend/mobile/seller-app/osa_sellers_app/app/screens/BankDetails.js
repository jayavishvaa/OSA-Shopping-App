import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Alert, CheckBox } from 'react-native';
import * as Yup from 'yup';
// import { Checkbox } from 'react-native-paper';

import Screen from '../components/Screen';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import Button from '../components/Button';

import defaultStyles from '../config/styles';
import Text from '../components/Text';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
    checked: Yup.string()
        .required('Select Anyone')
});

function BankDetails() {
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const setToggleCheckBox = () => {
        setChecked(true);
        setChecked1(false);
        setChecked2(false);
    }

    const setToggleCheckBox1 = () => {
        setChecked(false);
        setChecked1(true);
        setChecked2(false);
    }

    const setToggleCheckBox2 = () => {
        setChecked(false);
        setChecked1(false);
        setChecked2(true);
    }

    return(
        <Screen style={styles.container}>
            <Form
                initialValues={{checked:false}}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                validationSchema={validationSchema}
            >
                <ScrollView>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <CheckBox 
                                value={checked}
                                onValueChange={setToggleCheckBox}
                                style={{marginRight:'2%'}}
                            />
                            <Text style={styles.checkBoxText}>I sell in GST exempted category</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <CheckBox 
                                value={checked1}
                                onValueChange={setToggleCheckBox1}
                                style={{marginRight:'2%'}}
                            />
                            <Text style={styles.checkBoxText}>I have never registered for GST</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <CheckBox 
                                value={checked2}
                                onValueChange={setToggleCheckBox2}
                                style={{marginRight:'2%'}}
                            />
                            <Text style={styles.checkBoxText}>I'll update it later</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Button
                                // onPress={() => navigation.navigate(routes.REGISTER)}
                                title="Continue"
                                style={{ width: "75%"}}
                            />
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
