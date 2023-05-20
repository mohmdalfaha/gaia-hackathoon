import React from 'react';
import { Text, View,StyleSheet, Pressable, ActivityIndicator } from 'react-native';

const ActionButton = ({
  onPress = () => {},
  text = "",
  style = {},
  textStyle = {},
  disabled = false,
  isLoading = false,
}) => (
  <Pressable
    disabled={disabled}
    style={[styles.container, style]}
    onPress={onPress}
  >
    {isLoading ? (
      <ActivityIndicator color={"#000"} size="small" />
    ) : (
      <Text style={[textStyle,{color: '#fff'}]}>{text}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        height: 43,
        width: 344
    },
})


export default ActionButton;
