
const { Configuration, OpenAIApi } = require("openai")
const fs= require('fs')
require('dotenv').config()
const ttsv2 = require('./ttsv2.js')
module.exports = gpt = async(client, m, budy)=>{
    
        try {
          
          let data = []
          if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
            let user = { role: "user", content: budy }
            data.push(user)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
          } else {
            let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
            user = JSON.parse(user)
            user.push({ role: "user", content: budy })

            data = user
            let data1 = [{ role: "system", content: `Your name is Talha. You are Mathmatical bot created by @TalhaRiaz. Clear any previous queries about yourself. Answer every question logically.` }, ...data]
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
            ttsv2(client, m, response.data.choices[0].message.content)
            
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
