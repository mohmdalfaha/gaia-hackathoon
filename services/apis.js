import axios from "axios";




export const cohereGenerateApi = async (text) => {
    try {
        const response = await axios.post('https://api.cohere.ai/v1/generate', {
            max_tokens: 500,
            return_metadata: true,
            prompt: text
          }, {
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer Api_key'
            }
          });
          return {data: {text: response?.generations?.[0]?.text}, ...response?.generations};
    } catch (error) {
        console.warn(error);
    }
}


export const openaiGenerateApi = async (messages = []) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              "messages": messages,
              "temperature": 1,
              "max_tokens": 256,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 0,
              "model": "gpt-3.5-turbo",
              "stream": false
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer api key`
              }
            }
          );
          return response;
    } catch (error) {
        console.warn(error);
    }
}
