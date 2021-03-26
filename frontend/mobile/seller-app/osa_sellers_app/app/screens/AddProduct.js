import React, { useState } from 'react';
import { View,Text,StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import {Title, Button} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import routes from '../navigation/routes';
import Add from './Add';
import List from './List';
import Header from '../components/Header';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  DropDown
} from "../components/forms";
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProductTab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <ProductTab.Navigator
      initialRouteName={"Add"}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        tabStyle: { width:100},
        style: { backgroundColor: 'powderblue' },
      }}
    >
      <ProductTab.Screen
        name={"Add"}
        component={Add}
        options={{ tabBarLabel:'Add'}}
      />
      <ProductTab.Screen
        name={"List"}
        component={List}
        options={{ tabBarLabel:'List'}}
      />
    </ProductTab.Navigator>
  )
}

const validationSchema = Yup.object().shape({
  MRP: Yup.number().min(0).required("Please provide the MRP").label("MRP"),
  sellingPrice: Yup.number().min(0).required("Please provide its selling price").label("Selling Price"),

});

export default function AddProduct() {
  const [ error, setError] =useState(false);
  const [ addPressed, setAddPressed ] = useState(false);
  const [ listPressed, setListPressed ] = useState(false);

  const ListPage = () => {
    setListPressed(true);
    setAddPressed(false);
  }

  const AddPage = () => {
    setListPressed(false);
    setAddPressed(true);
  }

    return ( 
        <Screen>
          <Header/>
            <View>
                <Title style={{textAlign:'center'}}>Add Product</Title>
                <View style={{flexDirection:'row',marginTop:'5%'}}>
                    <Button mode="outlined" style={{width:'50%'}} onPress={AddPage}>ADD</Button>
                    <Button mode="outlined" style={{width:'50%'}} onPress={ListPage}>List</Button>
                </View>

                {
                  listPressed &&
                  <View>
                    <List/>
                  </View>
                }
                {  addPressed && 
                <View>  
                <View style={{flex:1}}>
                  <Add/>
                </View>
                <View style={{marginTop:'40%'}}>
                  <Form
                    initialValues={{
                      MRP:'',
                      sellingPrice:''
                    }}
                    validationSchema={validationSchema}
                  >
                    <ErrorMessage error="Something went wrong" visible={error}/>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:1,marginLeft:'7%'}}>
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="rupee"
                            keyboardType="number-pad"
                            name="MRP"
                            width="75%"
                            placeholder="MRP"
                        />
                      </View>
                      <View style={{flex:1}}>
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="rupee"
                            keyboardType="number-pad"
                            name="sellingPrice"
                            width="75%"
                            placeholder="Selling Price"
                        />
                      </View>
                    </View>
                    <Text style={{marginLeft:'7%',fontSize:17,color:'grey',marginTop:'4%',marginBottom:'4%'}}>Discounts 20% Applied</Text>
                    <View style={{alignItems:'center'}}>
                      <SubmitButton title="Add" style={{width:'40%',borderRadius:25}}/>
                    </View>
                  </Form>
                </View>
                </View>}                
            </View>
        </Screen>
        
    )
}