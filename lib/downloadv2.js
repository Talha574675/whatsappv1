
const axios = require('axios')


const getData = async (client, id, url,name,caption,exten,options ) => {
  console.log('download is runnig')
    try {
   
  const urlParts = url.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  const fileName = lastPart.split('?')[0];
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      
      
      await client.sendMessage(
        id, 
        {
            document: {url:url},
            mimetype: res.headers['content-type'],
            fileName:`${name || fileName}`, 
 
        }
        
    )
     
    } catch (err) {
    
      console.log(err);
    }
  };
module.exports = getData
