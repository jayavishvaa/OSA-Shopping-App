import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/Text';
import Button from '../components/Button';
import routes from '../navigation/routes';

function NotRegistered({ navigation }) {
  return(
      <Screen>
          <View style={styles.container}>
              <Image style={styles.emoji} source={require('../assets/notRegistered.jpeg')}/>
              <Text style={{
                  color: 'rgba(0,0,0,0.5)',
                  textAlign: 'center',
                  margin:'5%',
                }}>Looks like you are new to this app, please register yourself</Text>
                <Button
                    onPress={() => navigation.navigate(routes.REGISTER)}
                    title="Register"
                    style={{ width: "75%"}}
                />
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      top: '15%'
  },
});

export default NotRegistered;