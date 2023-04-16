const fs = require('fs')
const util = require('util')
const gTTS = require('gtts');

let unlink = util.promisify(fs.unlinkSync)
module.exports = tts=  async(text,client,pathofsound)=>{



    let filepath =pathofsound;
    try{
        var gtts = new gTTS(text, 'hi');
        gtts.save(filepath, function (err, result) {
        
        
           client.sendMessage(
                m.sender, 
                { audio: { url:pathofsound}, mimetype: 'audio/mp4' } ,
                { url: pathofsound } // can send mp3, mp4, & ogg
             
            ).then((res)=>{
                unlink(pathofsound).then((res)=>console.log('done sending audio'))
            })
   
        
           
    })
    
    
    
    } 
    catch(err){
    console.log(err);
    }
     
   
   
   }