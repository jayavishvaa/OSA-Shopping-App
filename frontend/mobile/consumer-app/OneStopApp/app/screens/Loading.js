import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

function Loading() {
  return(
    <View style={styles.container}>
        <LottieView
            autoPlay
            loop={true}
            source={require("../assets/animations/loading.json")}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default Loading;