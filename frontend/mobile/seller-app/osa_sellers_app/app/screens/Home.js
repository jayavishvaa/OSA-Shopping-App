import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Home() {
    return (
        <Screen>
            <Header/>
            <View style={{marginTop:'10%'}}>
                <View style={{flexDirection:'row',marginLeft:'10%'}}>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            backgroundColor:'#d2691e',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:'10%'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'white'}}>NEW ORDERS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            backgroundColor:'#d2691e',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'white'}}>PACKED</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',marginLeft:'10%',marginTop:'10%'}}>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            backgroundColor:'#d2691e',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:'10%'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'white'}}>PICKED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width:150,
                            height:150,
                            backgroundColor:'#d2691e',
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <Text style={{fontSize:25,textAlign:'center',color:'white'}}>DELIVERED</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </Screen>
    );
}

export default Home;