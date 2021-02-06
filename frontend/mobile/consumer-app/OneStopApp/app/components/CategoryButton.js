import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text from './Text';

function CategoryButton({ onPress, categoryName }) {
  return(
    <View style={styles.container}>
        <TouchableOpacity style={{ 
            width: '98%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 10,
            paddingHorizontal: 15,
            margin: 5,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row'
        }}
        onPress={onPress}
        >
            <Text style={{
            color: "rgba(0,0,0,0.8)"
            }}>{categoryName}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      width: '100%'
  }
});

export default CategoryButton;