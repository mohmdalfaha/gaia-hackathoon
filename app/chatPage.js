import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { cohereGenerateApi, openaiGenerateApi } from '../services/apis';
import { useLocalSearchParams } from 'expo-router';

const ChatScreen = () => {
 const params = useLocalSearchParams();

  const [messages, setMessages] = useState([{
    _id: Math.random().toString(36).substring(7),
    text:  params.initialText,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Aitisma',
      avatar: 'https://placeimg.com/140/140/bot'
    }
   }]);
  
  useEffect(() => {
    handleSend('');
  }, []);

  const handleSend = async (newMessages = []) => {
    const text = newMessages[0].text;
  
    const response = await openaiGenerateApi(text)

      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: response.data?.text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
          avatar: 'https://placeimg.com/140/140/bot'
        }
      };
  
      const senderMessage = {
        _id: Math.random().toString(36),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
          avatar: 'https://placeimg.com/140/140/any'
        }
      };
  
      setMessages(previousMessages => GiftedChat.prepend(previousMessages, [senderMessage]));
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));

  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleSend(newMessages)}
      user={{
        _id: 1,
        name: 'User',
        avatar: 'https://placeimg.com/140/140/any'
      }}
    />
  );
};

export default ChatScreen;


