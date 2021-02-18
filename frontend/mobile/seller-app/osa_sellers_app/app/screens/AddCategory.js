import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import Header from '../components/Header';
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

function AddCategory({ navigation }) {
    const auth = useAuth();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleSubmit = async formData => {
        setUploadVisible(true);
        const dataToSend = { categoryName: formData.category, shopId: auth.user.shop }
        const result = await shopsApi.createCategory(dataToSend, 
            (progress) => setProgress(progress)    
        );
        if (!result.ok) {
            setUploadVisible(false);
            return alert("Couldn't create this time, retry after sometime....");
        }
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
        <Form
            initialValues={{
                category: ''
            }}
            onSubmit={handleSubmit}
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
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15
  }
});

export default AddCategory;