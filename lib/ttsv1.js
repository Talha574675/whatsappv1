const fs = require('fs')
const util = require('util')

let unlink = util.promisify(fs.unlinkSync)
module.exports = ttsv1=  async(text,client,pathofsound , lang)=>{
    const gtts = require('node-gtts')(lang);


    let filepath =pathofsound;
    
          
        gtts.save(filepath, text , ()=>{
        
        
           client.sendMessage(
                m.sender, 
                { audio: { url:pathofsound}, mimetype: 'audio/mp4' } ,
                { url: pathofsound } // can send mp3, mp4, & ogg
            
            ).then((res)=>{
                unlink(pathofsound).then((res)=>console.log('done sending audio'))
            })
   
        
           
    })
    
    
    
   
     
   
   
   }
