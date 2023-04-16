const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('./my-func')
const googleTTS = require("google-tts-api");
const https = require('https')
const fs = require('fs-extra')

const play = require('play-dl')
const { Client, MusicClient } = require("youtubei");
module.exports =ytd =  async(client, id, text) => {
  console.log(id)
  const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
  };
  if (!text) {
      client.reply(`❌Please provide me a url`);
      return;
  }
  try {
     
     let randomName = getRandom(".mp4");
      const youtube = new Client();
      const videos = await youtube.search(text, {
        type: "video", // video | playlist | channel | all
      });
       const yt = await play.video_info(`https://www.youtube.com/watch?v=${videos.items[0].id}`)
        
       const data1 =  yt.format.filter((el)=> el.mimeType == 'audio/webm; codecs="opus"')
      
       const stream = fs.createWriteStream(`./${randomName}`);
       const server = https.get(data1[0].url, (response) => {
         let contentType = response.headers['content-type'];
         console.log(contentType)
         response.on('data',(chunk)=>{
           stream.write(chunk)
           
         })
         response.on('end', () => {
           stream.end();
         });
         stream.on('error', (err) => {
           console.error(err);
          
         });
         stream.on('finish',async()=>{
          
          client.sendMessage(
                    id, 
                    { audio: { url:`./${randomName}`}, mimetype: 'audio/mp4' } ,
                    { url: `./${randomName}`} 
                     // can send mp3, mp4, & ogg
                 
                )          
         
         
         fs.unlinkSync(`./${randomName}`)
           console.log('finish')
           
         })

})
     
          
  } catch (e) {
      console.log(e)
  }
}
