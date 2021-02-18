import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import Header from '../components/Header';
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
    DropDown
} from "../components/forms";
import Text from '../components/Text';
import UploadScreen from './UploadScreen';
import useAuth from '../auth/useAuth';
import shopsApi from '../api/shops';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please provide the item name").min(3).max(100).label("Item name"),
    description: Yup.string().max(255).label("Description"),
    MRP: Yup.number().min(0).required("Please provide the MRP").label("MRP"),
    sellingPrice: Yup.number().min(0).required("Please provide its selling price").label("Selling Price"),
    perQty: Yup.object().required("Please select a quantity").nullable().label("Select Quantity"),

    // name: Joi.string().min(3).max(100).required(),
    // description: Joi.string().min(5).max(255),
    // MRP: Joi.number().required().min(0),
    // sellingPrice: Joi.required().number().min(0),
    // shop: Joi.objectId().required()
});

const items = [
    {label: 'Kilogram', value: 'kilo', hidden: true},
    {label: 'Gram', value: 'gram' },
    {label: 'Litre', value: 'litre' },
    {label: 'Milliliter', value: 'milliliter' },
    {label: 'Bottle', value: 'bottle' },
    {label: 'Packet', value: 'packet' },
    {label: 'Piece', value: 'piece' },
    {label: 'Box', value: 'box' },
    {label: 'Bag', value: 'bag' },
    {label: 'Pouch', value: 'pouch'},
    {label: 'Bar', value: 'bar'},
    {label: 'Tube', value: 'tube'},
    {label: 'Container', value: 'container'},
    {label: 'Pound', value: 'pound'},
];

function AddItem({ route, navigation }) {
    const auth = useAuth();
    const [error, setError] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [edit, setEdit] = useState(false);

    const handleSubmit = async (formData, { resetForm }) => {
        setUploadVisible(true);
        const dataToSend = {
            name: formData.name,
            description: formData.description,
            MRP: formData.MRP,
            sellingPrice: formData.sellingPrice,
            perQty: formData.perQty.value,
            shop: auth.user.shop,
            shopCategory: route.params.categoryName,
            pinCode: auth.user.pinCode
        }
        if (route.params.name) {
            setEdit(true);
            const result = await shopsApi.editItem({ ...dataToSend, _id: route.params._id }, 
                (progress) => setProgress(progress)
            );
            console.log(result);
            if (!result.ok) {
                setUploadVisible(false);
                setError(true);
                return alert("Couldn't edit this time, retry after sometime....");
            }
        } else {
            const result = await shopsApi.createItem(dataToSend, 
                (progress) => setProgress(progress)    
            );
            console.log(result);
            if (!result.ok) {
                setUploadVisible(false);
                setError(true);
                return alert("Couldn't create this time, retry after sometime....");
            }
            resetForm();
        }
    }
  return(
    <Screen>
    <UploadScreen
        onDone={() => {
            setUploadVisible(false);
            if (edit) {
                navigation.navigate(routes.MYITEMS, { categoryName: route.params.categoryName });
            }
        }}
        progress={progress}
        visible={uploadVisible}
    />
      <Header/>
      <View style={styles.container}>
      <FontAwesome5 name="box-open" size={110} color="rgba(0,0,0,0.5)" />
      <View style={{ width: '100%' }}>
    <Form
        initialValues={{
            name: route.params.name ? route.params.name : '',
            description: route.params.description ? route.params.description : '',
            MRP: route.params.MRP ? route.params.MRP.toString() : '',
            sellingPrice: route.params.sellingPrice ? route.params.sellingPrice.toString() : '',
            perQty: route.params.perQty ? { value: route.params.perQty } : null
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
    >
        <ErrorMessage error="Something went wrong" visible={error}/>
        <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="name"
            placeholder="Item Name"
        />
        <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="description"
            placeholder="Description (optional)"
        />
        <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="rupee"
            keyboardType="number-pad"
            name="MRP"
            width="50%"
            placeholder="MRP"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '40%'}}>
            <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="rupee"
                keyboardType="number-pad"
                name="sellingPrice"
                width="100%"
                placeholder="Selling Price"
            />
            </View>
        <Text style={{ marginLeft: 10, color: 'gray', fontSize: 22 }}>/</Text>
        <View style={{ width: '50%' }}>
        <DropDown
            items={items}
            defaultValue={route.params.perQty ? route.params.perQty : ''}
            containerStyle={{
                height: 50,
                borderRadius: 25,
            }}
            name="perQty"
            labelStyle={{
                fontSize: 18,
                color: 'rgba(0,0,0,0.5)'
            }}
            selectedLabelStyle={{ color: 'rgba(0,0,0,0.9)' }}
            style={{
                backgroundColor: '#fafafa',
                alignSelf: 'flex-end',
                marginLeft: 10
            }}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: 'rgba(252,252,252,1)'}}
            placeholder="per Qty."
            placeholderStyle={{
                color: "rgba(0,0,0,0.5)",
                fontSize: 18
            }}
        />
        </View>
        </View>
        <SubmitButton title="Create"/>
    </Form>
      </View>
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

export default AddItem;