const googleTTS = require('google-tts-api'); // CommonJS
const fs = require('fs')
const https = require('https')
const { Configuration, OpenAIApi } = require("openai")
require('dotenv').config()
module.exports  = ttsv2 = async (client, m, text) =>{
try {
  
  let user = []
  console.log('text inside the ttsv2', text)
  user.push({ role: "user", content: `which language is this "${text.split(' ').splice(0,5).join(' ')}"
  Reply in codes form like en for English 
  Reply in that format 
  (lang=en)
  Only send that code don't add text to your reply.` })
  
  const configuration = new Configuration({
      apiKey: process.env.API_KEY,
    });
    const openai = new OpenAIApi(configuration);
   
    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: user,
    }).then((response) => {
      let lang = response.data.choices[0].message.content.split('=')[1].split(')')[0]
     
      console.log(lang)
      if(lang.length > 5) lang = 'ur'
      const results = googleTTS.getAllAudioBase64(text, {
        lang: lang,
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
        splitPunct: ',.?',
      }).then(async(results)=> {
        let base64 = ''
        results.forEach((res)=>{
        
          base64 += res.base64
        }) 
        
        buffer = Buffer.from(base64, 'base64')
        await client.sendMessage( m.sender, { audio: buffer , mimetype: 'audio/mp4' } ,{quoted: m})
    })
    })
  
} catch (error) {
  console.log(error)
 client.sendMessage( m.sender, { text:'error detecting audio '} )

}

}