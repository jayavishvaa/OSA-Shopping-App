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
import ImagePickerExample from '../components/ImagePicker';
import Button from '../components/Button';
import Text from '../components/Text';
import { ScrollView } from 'react-native-gesture-handler';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
    checked: Yup.string()
        .required('Select Anyone'),
    gstNumber: Yup.string()
        .required('Please enter your GSTIN number')
        .length(10)
        .label('GSTIN Number')
});

  
function BussinessDetails({navigation}) {
    const [checked, setChecked] = useState(false);
    const [Gstin, setGstin] = useState(false);

    const GstinField = () => {
        setChecked('first');
        setGstin(true);
    }
    return(
        <Screen style={styles.container}>
            <Title style={{
                    textAlign:'center',
                    marginBottom:'2%',
                    marginLeft:'10%',
                    borderBottomColor:'#2ccce4',
                    borderBottomWidth:1.5,
                    width:'45%'}}>BUSINESS DETAILS</Title>
            <ScrollView>
            <View>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:'15%'}}>
                    <RadioButton
                        value="first"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={GstinField}
                        color="orange"
                    />
                    <Text style={styles.checkBoxText}>I have GSTIN</Text>
                </View>
                <View style={{marginLeft:'15%',marginRight:'5%'}}>
                    {Gstin && 
                        <Form
                            initialValues={{
                                gstNumber: '',
                            }}
                            onSubmit={values => Alert.alert(JSON.stringify(values))}
                            validationSchema={validationSchema}
                        >
                            <View style={{width:'75%',marginLeft:'10%'}}>
                                <FormField
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="number-pad"
                                    name="gstNumber"
                                    placeholder="GSTIN Number"
                                />
                            </View>
                            <View style={{width:'50%',marginLeft:'10%',borderRadius:'10%'}}>
                                <SubmitButton title="Verify" style={{borderRadius:25}}/>
                            </View>
                        </Form>
                    }
                </View>
            </View>
            <View>
                <ImagePickerExample/>
            </View>
            <Form
                initialValues={{checked:false}}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                validationSchema={validationSchema}
            >
                <ScrollView>
                    <View style={{margin:'15%'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="second"
                                status={ checked === 'second' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('second')}
                                color="orange"
                            />
                            <Text style={styles.checkBoxText}>I sell in GST exempted category</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="third"
                                status={ checked === 'third' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('third')}
                                color="orange"
                            />
                            <Text style={styles.checkBoxText}>I have never registered for GST</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="fourth"
                                status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('fourth')}
                                color="orange"
                            />
                            <Text style={styles.checkBoxText}>I'll update it later</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Button
                                onPress={() => navigation.navigate(routes.BANKDETAILS)}
                                title="Continue"
                                style={{ width: "75%",borderRadius:25}}
                            />
                        </View>
                    </View>

                </ScrollView>
            </Form>
            </ScrollView>
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

export default BussinessDetails;
