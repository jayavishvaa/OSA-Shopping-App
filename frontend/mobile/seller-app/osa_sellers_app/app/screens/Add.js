import React, {useState} from 'react';
import { View,Text,StyleSheet,Picker} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { color } from 'react-native-reanimated';


const CategoryItems = [
        {label: 'Grocery', value: 'Grocery'},
        {label: 'Medical', value: 'Medical'},
        {label: 'Salon', value: 'Salon'},
        {label: 'Repairs', value: 'Repairs'},
        {label: 'Electronics', value: 'Electronics'},
        {label: 'Free-lancing', value: 'Free-lancing'},
] 


const ProductItems = [
    {label: 'Bicuit', value: 'Bicuit'},
    {label: 'Milk', value: 'Milk'},
    {label: 'Maggie', value: 'Maggie'},
    {label: 'Egg', value: 'Egg'},
    {label: 'Salt', value: 'Salt'},
    {label: 'snacks', value: 'snacks'},
] 

export default function Add() {
    const [categoryValue, setCategoryValue] = useState('');
    const [productValue, setProductValue] = useState('');
    return (
        <View>
            <View style={styles.container1}>
                {/* <Picker
                    selectedValue={selectedValue}
                    style={{height:50,width:150,borderBottomColor:'black',borderBottomWidth:2}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    mode="dropdown"
                    itemStyle={{}}
                >
                    <Picker.Item label="Grocery" value="Grocery"/>
                    <Picker.Item label="Salon" value="Salon"/>
                    <Picker.Item label="Medical" value="Medical"/>
                    {/* <Picker.Item label="Grocery" value="Grocery"/> */}
                {/* </Picker> */}
                <DropDownPicker
                    items={CategoryItems}
                    defaultValue={categoryValue}
                    containerStyle={{height:40,width:'75%'}}
                    selectedLabelStyle={{color:'black'}}
                    placeholder="Select a category"
                    placeholderStyle={{color:'black'}}
                    searchable={true}
                    searchablePlaceholder="Search for an category"
                    searchablePlaceholderTextColor="gray"
                    searchableError={() => <Text>Not Found</Text>}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setCategoryValue(item.value)}
                />
                <DropDownPicker
                    items={ProductItems}
                    defaultValue={productValue}
                    containerStyle={{height:40,width:'75%',marginTop:'7%'}}
                    selectedLabelStyle={{color:'black'}}
                    placeholder="Select a Product"
                    placeholderStyle={{color:'black'}}
                    searchable={true}
                    searchablePlaceholder="Search for an Product"
                    searchablePlaceholderTextColor="gray"
                    searchableError={() => <Text>Not Found</Text>}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setProductValue(item.value)}
                />

                
            </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
      alignItems: "center",
      marginTop:'10%'
    }
  });