import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';


function Notification() {
    return (
        <Screen>
            <Header/>
            <View>
                <Text>Notification Page</Text>
            </View>
        </Screen>
    );
}

export default Notification;