import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../navigation/routes';
import { useNavigation} from '@react-navigation/native';

function Home() {
    const navigation = useNavigation();
    return (
        <Screen>
            <Header/>
            <View style={{marginTop:'10%'}}>
                <View style={{flexDirection:'row',marginLeft:'10%'}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(routes.NEWORDERS)} 
                        style={{
                            width:150,
                            height:150,  
                            borderRadius:15,
                            borderWidth:2,
                            borderColor:'#2ccce4',
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:'10%'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'black'}}>NEW ORDERS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            borderWidth:2,
                            borderColor:'#2ccce4',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'black'}}>PACKED</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',marginLeft:'10%',marginTop:'10%'}}>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            borderWidth:2,
                            borderColor:'#2ccce4',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:'10%'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'black'}}>PICKED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            borderWidth:2,
                            borderColor:'#2ccce4',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'black'}}>DELIVERED</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </Screen>
    );
}

export default Home;