const Tesseract  =  require('tesseract.js');
const gpt = require('./gpt.js')
const fs = require('fs')
module.exports = imagetotext = (client, m, path,state) => {
Tesseract.recognize(path,).then(({ data: { text } }) => {
 if(!state) client.sendMessage(m.sender, {text: text})
 if(state) gpt(client,m, `${m.body} \n ${text}`)
 fs.unlinkSync(path)
}).catch(err=>{
  console.log(err)
  client.sendMessage(m.sender, {text: 'filed to get text from image'})
})
}