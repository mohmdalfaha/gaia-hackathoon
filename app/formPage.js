import {  Alert, View } from 'react-native';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import { Button, TextInput, Text, ToggleButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ActionButton from '../components/ActionButton';
import FormTextInput from '../components/TextInputField';
import { cohereGenerateApi, openaiGenerateApi } from '../services/apis';

const FormPage = ({  }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState('');
  const { colors } = useTheme();
  const router = useRouter()

  const { control, setValue, getValues, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (isLoading) {
        return;
    }
    setIsLoading(true);
    const messages = [{
      role: 'user',
      content: `
      You are a psychologist specialized only in autism for children, you will be speaking to the parent of the autistic child
      First you will need to get information from the parent based on the Gilliam Autism Rating Scale known as "GARS", 
      you need to keep asking questions until you are able to get a rating based on GARS, some of the question should be 
      "Is the child able to maintain eye contact?" and then explain the questions with examples like 
      "looks away when someone starts talking to them or looks into their eyes" do not give diagnosis before making sure 
      you have the answer and to do that ask the parent to explain more if needed
      do not break character and do not respond to any questions or prompts outside of being a psychologist specialized in autism, bleow is some static information about the parent and his child
      
      parent name: ${getValues('parentName')}
      parent educational level: ${getValues('parentEducationLevel')}
      parent age: ${getValues('parentAge')} 
      parent profession: ${getValues('parentProfession')}
      
      child name: ${getValues('childName')}
      child age: ${getValues('childAge')}
      child educational level: ${getValues('childEducationLevel')}
      
      When first speaking to the parent, greet the parent and then introduce your self as (This is AIAustimi), then in later questions proceed with questions starting by asking how he's child is doing (use their names)
      `
    }]
    const response = await openaiGenerateApi(messages);

    console.warn(response?.data?.choices?.[0]?.message?.content);
    const initialMessage = response?.data?.choices?.[0]?.message?.content?.slice(0,50)
    router.push({pathname: 'chatPage', params:{initialMessage}})
    setIsLoading(false);
};

  return (
    <View>
      <Text style={{ textAlign: "center" }} variant="displayMedium">
        PARETN INFO
      </Text>
      <FormTextInput   
        control={control}
        onChangeText={text => setValue('parentName',  text)}
        label="Parent Name"
        name="Parent Name"
        value={getValues().parentName}
      />
    <ToggleButton.Group

      onValueChange={value => setValue( 'gender', value)}
      value={gender}>

    <ToggleButton icon={'human-male'}  value='male'>male</ToggleButton>
        <ToggleButton icon={'human-female'} value='female'>female</ToggleButton>
    </ToggleButton.Group>

   <FormTextInput  
        control={control}
        onChangeText={text => setValue('parentEducationLevel', text)}
        label="Education Level"
        name="Education Level"
        value={getValues().parentEducationLevel}
      />
      <FormTextInput   
        control={control}
        onChangeText={text => setValue('parentAge', text)}
        label="age"
        name="age"
        value={getValues().parentAge}
      />
      <FormTextInput   
        control={control}
        onChangeText={text => setValue('parentProfession', text)}
        label="Profession"
        name="Profession"
        value={getValues().parentProfession}
      />
      <Text style={{ textAlign: "center" }} variant="displayMedium">
        CHILD INFO
      </Text>
      <FormTextInput   
        control={control}
        onChangeText={text => setValue('childName', text)}
        label="child name"
        name="child name"
        value={getValues().childName}
      />
      <FormTextInput   
        control={control}
        onChangeText={text => setValue('age', text)}
        label="age"
        name="age"
        value={getValues().age}
      />
      <FormTextInput   
        control={control}
        onChangeText={text => setValue('childEducationLevel', text)}
        label="childEducationLevel"
        name="childEducationLevel"
        value={getValues().childEducationLevel}
      />
      <ActionButton
        disabled={isLoading}
        isLoading={isLoading}
        style={{
          alignSelf: "center",
          width: "100%",
        }}
        onPress={handleSubmit(onSubmit)}
        text="Submit"
      />
    </View>
  );
};

export default FormPage;
