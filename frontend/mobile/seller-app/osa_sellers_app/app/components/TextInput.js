import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", placeHolder, ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (icon === "shop" 
      ? (
        <Entypo
          name="shop"
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      ) : icon === "rupee" 
      ? (
        <FontAwesome
          name="rupee"
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      ) : (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      ))}
      <TextInput 
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        placeholder={placeHolder}
        {...otherProps}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: defaultStyles.colors.secondary,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center"
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
