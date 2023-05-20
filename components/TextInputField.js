import React from 'react';
import { Text, View,StyleSheet  } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller, useController } from "react-hook-form";

const FormTextInput = ({
  defaultValue = "",
  style = {},
  placeholder = "",
  label = "",
  textStyle = {},
  disabled = false,
  name = "",
  control = null,
  ...props

}) => {
  const { field } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <TextInput
      style={style}
      label={label}
      color
      placeholder={placeholder}
      contentStyle={{backgroundColor: '#FFFFFF'}}
      disabled={disabled}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3C283',
        height: 43,
        width: 344
    },
})


export default FormTextInput;
