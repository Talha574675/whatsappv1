
const { Configuration, OpenAIApi } = require("openai")
const fs= require('fs')
require('dotenv').config()
module.exports = gpt = async(client, m, budy)=>{
    
        try {
          const chat = `I am personal Ai assitant for whatsapp. I am created by M.Talha. My mail is talhariaz5425869@gmail.com . My web is talhariaz.tech. You can contact me at +923320843832. here are some of the things i can do:\n\n🧠 /ai <text> - generate text using ai\n🔍 /google <text> - search on google\n🖼️ /img <text> - search for an image\n🔗 /pdfweb <link> - convert a webpage to pdf\n📷 /ss <link> - take a screenshot of a webpage\n📷 /insta <link> - save an instagram photo or video\n💾 /save <download link> - download a file\n📄 /pdf <text> - generate a pdf from text\n🔊 /tts <text> - convert text to speech\n🎥 /video <text or yt link> - search for a video on youtube\n🧹 /clear - clear the chat history\n🔎 /whois <whois> - lookup whois information\n📱 /ufone - get free 1GB internet data\n📷 /ocr <image> - extract text from an image using OCR\n📝 /data - view previous chats with me\n\n . I can also do voice chat with you.`          
          let data = []
          if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
            let user = { role: "user", content: budy }
            data.push(user)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
             let data1 = [{ role: "system", content: chat }, ...data]
             data = data1
          } else {
            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
            user = JSON.parse(user)
            user.push({ role: "user", content: budy })

            data = user
            let data1 = [{ role: "system", content:chat }, ...data]
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
