const instagramGetUrl = require("instagram-url-direct")
const fs= require('fs')
const https = require('https')
 module.exports = instadownloader=  async(link,client, id, path)=>{
       instagramGetUrl(link).then((response)=>{
        console.log(response)
    response.url_list.forEach(url => {
    
   
    const file = fs.createWriteStream(path);
    https.get(url, (response) => {
let contentType = response.headers['content-type'];
if(contentType == 'video/mp4'){
console.log(contentType)
    response.pipe(file);
    file.on('finish', () => {
    file.close();
    client.sendMessage(id,{ video: { url:path}, mimetype: 'video/mp4' } , { url: path }  ).then(()=>{})
});
} else{
    console.log(contentType)
    response.pipe(file);
    file.on('finish', () => {
    file.close();
    const buttonMessage = {
        image: {url: url},


         headerType: 4
    }
    
    client.sendMessage(id, buttonMessage)
});
}
})
   
  
});
})
}
