
const https = require('https')
const fs = require('fs')
var mime = require('mime-types');
const request = require('request').defaults({ encoding: null });

try {
  module.exports = sendfromlink = async (client, id, urls,name,caption) =>{
   if(typeof(urls)== 'string'){
    https.get(urls, function ( res) {
      const mimetype = res.headers['content-type']
      console.log(mimetype)
      const extension = mime.extension(mimetype)
      console.log(extension)
      if(extension == false){
        client.sendMessage(id, {text:'Give Extension for file. and use *get <extension> <link>*\n example *get xapk https://d-07.winudf.com/b/APK/Y29tLmluc3RhZ3JhbS5hbmRyb2lkXzM2NzYwODQ5M180Y2U1NzYzZQ?_fn=SW5zdGFncmFtXzI3Ni4xLjAuMjYuMTAzX0Fwa3B1cmUuYXBr&_p=Y29tLmluc3RhZ3JhbS5hbmRyb2lk&download_id=1075008536059334&is_hot=false&k=2db89816e9a78d112ad36313d681d8e464296222&uu=http%3A%2F%2F172.16.73.1%2Fb%2FAPK%2FY29tLmluc3RhZ3JhbS5hbmRyb2lkXzM2NzYwODQ5M180Y2U1NzYzZQ%3Fk%3Dca40908509d249cdf9532d58ba52c57664296222*'})
        return
      }
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
  
} catch (error) {
  console.log(error)
}