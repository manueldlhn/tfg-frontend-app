import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", editable=true, ...otherProps }) {
  return (
    <View style={[styles.container, { width }, { backgroundColor: editable ? defaultStyles.colors.lightgrey : defaultStyles.colors.grey }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={ editable ? defaultStyles.colors.grey : defaultStyles.colors.darkgrey }
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.grey}
        style={defaultStyles.text}
        editable={editable}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
