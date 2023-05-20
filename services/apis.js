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
              authorization: 'Bearer 1JGg0legx8NFWsUB7waNRoYrqEF78V6NV6Z3e6Ld'
            }
          });
          return {data: {text: response?.generations?.[0]?.text}, ...response?.generations};
    } catch (error) {
        console.warn(error);
    }
}


export const openaiGenerateApi = async (text) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
             "model": "text-davinci-003",
              prompt: text,
              "temperature": 1,
              "max_tokens": 256,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 0
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer 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`
              }
            }
          );
          return {data:{text: response?.data?.choices[0].text},...response?.data};
    } catch (error) {
        console.warn(error);
    }
}
