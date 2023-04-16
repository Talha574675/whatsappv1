
const https = require('https')
const fs = require('fs')
var mime = require('mime-types');
const request = require('request').defaults({ encoding: null });
module.exports = apk = async (client, id, urls,name,caption, exten) =>{
 if(typeof(urls)== 'string'){
  https.get(urls, function ( res) {
    const mimetype = res.headers['content-type']
    console.log(mimetype)
    const extension = mime.extension(mimetype)
   
    let data = [];

    res.on('data', function(chunk) {
      data.push(chunk);
    });
  
    res.on('end', async ()=>{
      let buffer = Buffer.concat(data);
      // do something with the buffer
      await client.sendMessage(
        id, 
        {
            document: buffer,
            mimetype: mimetype,
            fileName:`${name}.${exten}`, 
            caption: caption,
            
        }
        
    )
    });

});

 }else{
  
  urls.forEach((el)=>{
    https.get(el, function ( res) {
        const mimetype = res.headers['content-type']
        console.log(mimetype)
        const extension = mime.extension(mimetype)
        console.log(extension)
        let data = [];

        res.on('data', function(chunk) {
          data.push(chunk);
        });
      
        res.on('end', async ()=>{
          let buffer = Buffer.concat(data);
          // do something with the buffer
          await client.sendMessage(
            id, 
            {
                document: buffer,
                mimetype: mimetype,
                fileName:`${name}.${extension}`, 
                caption: caption,
                
            }
            
        )
        });
 
  });
  
})
    
 }
}
