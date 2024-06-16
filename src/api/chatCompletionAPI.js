import axios from "axios";


// const AXIOS_GPT_INSTANCE = axios.create({
//     baseURL:'https://api.openai.com/',
//     headers:{
//         'Authorization':`Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
//     }
// })

// const ChatCompletionAPI = async () =>  {
    
//     const response = await AXIOS_GPT_INSTANCE.post('v1/chat/completions',{
//         model:'gpt-3.5-turbo',
//         messages:[
//             {
//                 'role': 'system',
//                 'content': 'You are a helpful assistant.',
//             },
//         ]
//     });

// }

const AXIOS_GEMINI_INSTANCE = axios.create({
    baseURL:'https://generativelanguage.googleapis.com/',
    headers:{
        'X-Goog-Api-Key':import.meta.env.VITE_SOME_KEY,
        'X-Goog-Api-Client':'genai-js/0.12.0'
    }
})

const ChatCompletionAPI = async ({conversation}) =>  {
    
    const response = await AXIOS_GEMINI_INSTANCE.post('v1beta/models/gemini-1.5-flash:generateContent',{
        'contents':conversation
    });

    console.log(response?.data?.candidates[0]?.content)

    return response?.data?.candidates[0]?.content;
}

export default ChatCompletionAPI;