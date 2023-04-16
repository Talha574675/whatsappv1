
const https = require('https')
const fs = require('fs')
var mime = require('mime-types');
const request = require('request').defaults({ encoding: null });
module.exports = downloader = async (client, id, urls,name,caption) =>{
    https.get(urls, function ( res) {
     
      const mimetype = res.headers['content-type']
      console.log(mimetype)
      const extension = mime.extension(mimetype)
      console.log(extension)
    let file = fs.createWriteStream(`./user/${id.split('@')[0]}.${extension}`)
     res.pipe(file)
     file.on('finish' ,async ()=>{
     
     const files = fs.readFileSync(`./user/${id.split('@')[0]}.${extension}`)
     console.log(files)
      await client.sendMessage(
          id, 
          {
              document: files,
              mimetype: mimetype,
              fileName:`${name}.${extension}`, 
              caption: caption,
              
          }
          
      ).then(()=>fs.unlinkSync(`./user/${id.split('@')[0]}.${extension}`))
        
   
    
     })
 
  });
  
        
}
