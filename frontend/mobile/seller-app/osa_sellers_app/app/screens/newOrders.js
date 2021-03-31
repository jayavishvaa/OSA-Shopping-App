import React from 'react';
import { View,Text,StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { Title } from 'react-native-paper';
import { ScrollView,TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';

export default function NewOrders() {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Screen>
            <Header/>
            <View>
                <ScrollView>
                    <Title style={{
                        marginTop:'5%',
                        marginLeft:'10%',
                        borderBottomColor:'#2ccce4',
                        borderBottomWidth:1.5,
                        width:'20%'
                    }}>ORDERS</Title>
                    <View style={{width:"82%",marginTop:'5%',marginLeft:'5%'}}>
                        <Searchbar
                            placeholder="Search by Customer Name"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style={{borderRadius:10}}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginLeft:'5%',marginTop:'5%',flex:1,width:'100%'}}>
                        <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.05)',width:100,marginRight:'3%',height:30,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                            <Text>TODAY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.05)',width:100,marginRight:'3%',height:30,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                            <Text>YESTERDAY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.05)',width:100,height:30,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                            <Text>THIS MONTH</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>            
        </Screen>
    )
}