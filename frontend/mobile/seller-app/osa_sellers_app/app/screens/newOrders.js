import React from 'react';
import { View,Text,StyleSheet,FlatList, Image} from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { Title } from 'react-native-paper';
import { ScrollView,TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';

const DATA = [
    {
      id: '1',
      title: 'Shiv Ram',
      price: '1200',
      Quantity: '36'
    },
    {
      id: '2',
      title: 'Second Item',
      price: '1200',
      Quantity: '36'
    },
    {
      id: '3',
      title: 'Third Item',
      price: '1200',
      Quantity: '36'
    },
  ];

  const Item = ({ title,price, Quantity }) => (
    <View style={{marginRight:'50%',flex:1,marginTop:'3%',marginLeft:'10%'}}>
      <Text style={{ fontWeight: 'bold',color:'black'}}>{title}</Text>
      <Text style={{ fontWeight: 'bold',color:'black'}}>{Quantity}</Text>
      <Text style={{ fontWeight: 'bold',color:'black'}}>{price}</Text>
    </View>
  );
  

export default function NewOrders() {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const renderItem = ({ item }) => (
        <View style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(0,0,0,0.05)',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          marginBottom:'7%',
          height:100
        }}>
            <Image source={require('../assets/AddItem.png')} style={{width:75,height:75,borderRadius:25,marginLeft:'10%'}}/>
            <View>
                <Item title={item.title} />
                <Item title={item.Quantity + '  item'} />
                <Item title={'Total: $ ' + item.price} />
            </View> 
        </View>
        );
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

                    <View style={{alignItems:'center',marginTop:'10%'}}>
                        <FlatList
                            style={{width:'90%'}}
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </View>            
        </Screen>
    )
}