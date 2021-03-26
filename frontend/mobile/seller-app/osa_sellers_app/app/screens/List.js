import React from 'react';
import { View,Text,StyleSheet, FlatList, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      price: '120/kg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      price: '120/kg'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      price: '120/kg'
    },
  ];

  const Item = ({ title,price }) => (
    <View style={{alignItems:'center',justifyContent:'center',marginRight:'50%'}}>
      <Text style={{ fontWeight: 'bold',color:'black',marginTop:-18,textAlign:'center' }}>{title}</Text>
      <Text style={{ fontWeight: 'bold',color:'black',textAlign:'center' }}>{price}</Text>
    </View>
  );
  

export default function List() {
    const renderItem = ({ item }) => (
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom:'7%',
        height:90
      }}>
          <Image source={require('../assets/AddItem.png')} style={{width:75,height:75,borderRadius:25}}/> 
          <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
            <Item title={item.title} />
            <Item title={item.price} />
          </View>
      </View>
      );
    return (
        <View>
          <ScrollView>
            <View style={styles.container}>
                <FlatList
                    style={{width:'90%'}}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop:'10%'
    },
  });
  