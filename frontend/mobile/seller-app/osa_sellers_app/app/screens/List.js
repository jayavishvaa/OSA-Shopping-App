import React, {useState} from 'react';
import { View,Text,StyleSheet, FlatList, Image, Switch} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';

const DATA = [
    {
      id: '1',
      title: 'First Item',
      price: '120/kg'
    },
    {
      id: '2',
      title: 'Second Item',
      price: '120/kg'
    },
    {
      id: '3',
      title: 'Third Item',
      price: '120/kg'
    },
  ];

  const Item = ({ title,price }) => (
    <View style={{marginRight:'50%',flex:1,marginTop:'5%'}}>
      <Text style={{ fontWeight: 'bold',color:'black',textAlign:'center'}}>{title}</Text>
      <Text style={{ fontWeight: 'bold',color:'black'}}>{price}</Text>
    </View>
  );
  

export default function List() {
    const [ toggle, setToggle ] = useState(false);
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
        height:90
      }}>
          <Image source={require('../assets/AddItem.png')} style={{width:75,height:75,borderRadius:25}}/>
          <View>
              <Item title={item.title} />
              <Item title={item.price} />
            <View style={{alignItems:'flex-end',flex:1}}>
              <Switch
                trackColor={{false: 'gray', true: 'teal'}}
                thumbColor="white"
                ios_backgroundColor="gray"
                onValueChange={(value) => setToggle(value)}
                value={toggle}
                style={{alignSelf:'flex-end',flex:1,marginLeft:'2%'}}        
              />
            </View>
          </View> 
      </View>
      );
    return (
        <View>
          <ScrollView>
            <View style={{width:"90%",marginTop:'5%',marginLeft:'5%'}}>
              <Searchbar
                placeholder="Search Product"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{borderRadius:25}}
              />
            </View>
            <View style={{flexDirection:'row',marginLeft:'5%',marginTop:'5%',flex:1,width:'100%'}}>
              <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.05)',width:100,marginRight:'3%',height:30,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                <Text>LOWEST</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.05)',width:100,height:30,alignItems:'center',justifyContent:'center',borderRadius:25}}>
                <Text>HIGHEST</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{marginTop:'5%',marginLeft:'5%',marginRight:'5%'}}>
                <TouchableOpacity style={{width:60,height:60,backgroundColor:'rgba(0,0,0,0.05)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                  <MaterialCommunityIcons name="fruit-watermelon" size={35}/>
                </TouchableOpacity>
                <Text style={{marginLeft:'8%'}}>Fruits</Text>
              </View>
              <View style={{marginTop:'5%',marginRight:'5%'}}>
                <TouchableOpacity style={{width:60,height:60,backgroundColor:'rgba(0,0,0,0.05)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                  <SimpleLineIcons name="pencil" size={35}/>
                </TouchableOpacity>
                <Text style={{marginRight:"3%"}}>Stationary</Text>
              </View>
              <View style={{marginTop:'5%'}}>
                <TouchableOpacity style={{width:60,height:60,backgroundColor:'rgba(0,0,0,0.05)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                  <MaterialCommunityIcons name="tshirt-v" size={35}/>
                </TouchableOpacity>
                <Text style={{}}>Clothes</Text>
              </View>
            </View>
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
  