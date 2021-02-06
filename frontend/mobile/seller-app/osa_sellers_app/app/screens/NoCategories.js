import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import UploadScreen from './UploadScreen';
import useAuth from '../auth/useAuth';
import shopsApi from '../api/shops';

const validationSchema = Yup.object().shape({
    category: Yup.string()
        .required('Please enter the category name')
        .min(3).max(100)
        .label('Category'),
});

function NoCategories() {
    const auth = useAuth();
    const [renderForm, setRenderForm] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePressCreateCategory = () => {
        setRenderForm(true);
    }
    const handleSubmitNewCategory = async (formData, { resetForm }) => {
        setUploadVisible(true);
        const dataToSend = { categoryName: formData.category, shopId: auth.user.shop }
        const result = await shopsApi.createCategory(dataToSend, 
            (progress) => setProgress(progress)    
        );
        if (!result.ok) {
            setUploadVisible(false);
            return alert("Couldn't create this time, retry after sometime....");
        }
        resetForm();
    }
  return(
      <Screen>
        <UploadScreen
            onDone={() => setUploadVisible(false)}
            progress={progress}
            visible={uploadVisible}
        />
        <Header/>
        <View style={styles.container}>
        <Entypo name="colours" size={120} color="rgba(0,0,0,0.5)" />
        {renderForm
        ? <Form
            initialValues={{
                category: ''
            }}
            onSubmit={handleSubmitNewCategory}
            validationSchema={validationSchema}
        >
            <ErrorMessage error="Something went wrong" visible={false}/>
            <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                name="category"
                placeholder="Category Name"
            />
            <SubmitButton title="Create"/>
        </Form>
        : <><Text style={{
            color: 'gray',
            textAlign: 'center',
            marginVertical: 4
        }}>You have not created any categories yet, create your categories here</Text>
        <Button title="Create a catgory" onPress={handlePressCreateCategory}/></>}
        </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4%',
  }
});

export default NoCategories;