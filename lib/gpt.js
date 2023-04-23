
const { Configuration, OpenAIApi } = require("openai")
const fs= require('fs')
require('dotenv').config()
module.exports = gpt = async(client, m, budy)=>{
    
        try {
          
          let data = []
          if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
            let user = { role: "user", content: budy }
            data.push(user)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
             let data1 = [{ role: "system", content: `you are personal ai assistant 🤖. you can chat and ask me to do things like generate text, search the web, or even create pdfs. here are some of the things i can do:\n\n🧠 /ai <text> - generate text using ai\n🔍 /google <text> - search on google\n🖼️ /img <text> - search for an image\n🔗 /pdfweb <link> - convert a webpage to pdf\n📷 /ss <link> - take a screenshot of a webpage\n📷 /insta <link> - save an instagram photo or video\n💾 /save <download link> - download a file\n📄 /pdf <text> - generate a pdf from text\n🔊 /tts <text> - convert text to speech\n🎥 /video <text or yt link> - search for a video on youtube\n🧹 /clear - clear the chat history\n🔎 /whois <whois> - lookup whois information\n📱 /ufone - get free 1GB internet data\n📷 /ocr <image> - extract text from an image using OCR\n📝 /data - view previous chats with me\n\n My advanced features include:

            1️⃣ I can reply to your pictures and audio messages without any command. Just send them over and I'll analyze them for you! 📷 🎤

            

            2️⃣ I can answer your queries related to the weather conditions of any location you want. 🌨️☀️

            

            3️⃣ I can perform language detection and translation for you, making communication between different languages easy! 🌍🗣️

            

            4️⃣ I can analyze the sentiment behind a sentence, so tell me how you feel and I'll understand it! 🤔😊😔

            

            To get started, type one of the commands above or simply send me messages and media, and I'll respond accordingly! 🚀"; 

            

            The updated message now includes the following additional functionalities:

            

            1. AI can reply to your pictures and audio messages without any command

            2. AI can answer queries related to weather conditions of any location

            3. AI can perform language detection and translation for you

            4. AI can analyze the sentiment behind a sentence.` }, ...data]
             data = data1
          } else {
            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
            user = JSON.parse(user)
            user.push({ role: "user", content: budy })

            data = user
            let data1 = [{ role: "system", content:`hi there! 👋 i'm your personal ai assistant 🤖. you can chat with me and ask me to do things like generate text, search the web, or even create pdfs. here are some of the things i can do:\n\n🧠 /ai <text> - generate text using ai\n🔍 /google <text> - search on google\n🖼️ /img <text> - search for an image\n🔗 /pdfweb <link> - convert a webpage to pdf\n📷 /ss <link> - take a screenshot of a webpage\n📷 /insta <link> - save an instagram photo or video\n💾 /save <download link> - download a file\n📄 /pdf <text> - generate a pdf from text\n🔊 /tts <text> - convert text to speech\n🎥 /video <text or yt link> - search for a video on youtube\n🧹 /clear - clear the chat history\n🔎 /whois <whois> - lookup whois information\n📱 /ufone - get free 1GB internet data\n📷 /ocr <image> - extract text from an image using OCR\n📝 /data - view previous chats with me\n\n My advanced features include:

            1️⃣ I can reply to your pictures and audio messages without any command. Just send them over and I'll analyze them for you! 📷 🎤

            

            2️⃣ I can answer your queries related to the weather conditions of any location you want. 🌨️☀️

            

            3️⃣ I can perform language detection and translation for you, making communication between different languages easy! 🌍🗣️

            

            4️⃣ I can analyze the sentiment behind a sentence, so tell me how you feel and I'll understand it! 🤔😊😔

            

            To get started, type one of the commands above or simply send me messages and media, and I'll respond accordingly! 🚀"; 

            

            The updated message now includes the following additional functionalities:

            

            1. AI can reply to your pictures and audio messages without any command

            2. AI can answer queries related to weather conditions of any location

            3. AI can perform language detection and translation for you

            4. AI can analyze the sentiment behind a sentence` }, ...data]
            data = data1

            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))


          }

          const configuration = new Configuration({
            apiKey: process.env.API_KEY,
          });
          const openai = new OpenAIApi(configuration);
          console.log(data)
          openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: data,
          }).then((response) => {

            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
            user = JSON.parse(user)
            user.push(response.data.choices[0].message)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))



            const buttonMessage = {
              text: `${response.data.choices[0].message.content}`,
              footer: 'ChatGpt',

              headerType: 1
            }

            client.sendMessage(m.sender, buttonMessage).then(() => {
              console.log(response.data.choices[0].message.content)
            })
 
            // client.sendMessage(m.sender, {text: `${response.data.choices[0].message.content}  \n\n\n>>>>Wait For Audio<<<<\n\n`})
            // tts(`${response.data.choices[0].message.content}  \n\n`, client ,pathofsound1)
            // ttsv1(`${response.data.choices[0].message.content}  \n\n`, client ,pathofsound1)

          })


        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply('error')
          }
        }
      
}
