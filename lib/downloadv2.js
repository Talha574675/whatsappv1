// const http = require('http');
// const https = require('https');
// const url = require('url');
// const mime = require('mime-types');
// const download = require('download');

// function downloadFile(urlString) {
//   const parsedUrl = url.parse(urlString);
//   return download(urlString).then((buffer) => {
//     const contentType = mime.lookup(parsedUrl.pathname) || 'text/html';
//     const extension = mime.extension(contentType) || 'unknown';
//     const fileName = parsedUrl.pathname.split('/').pop() || `download.${extension}`;
//     return { buffer, mime: contentType, extension, fileName };
//   }).catch((err) => {
//     console.warn(`download library failed, falling back to http/https: `);
//     return new Promise((resolve, reject) => {
//       const client = parsedUrl.protocol === 'https:' ? https : http;
//       const req = client.get(parsedUrl, (res) => {
//         if (res.statusCode !== 200) {
//           reject(new Error(`Failed to download file: ${res.statusCode} ${res.statusMessage}`));
//           return;
//         }
//         const contentType = res.headers['content-type'];
//         const method1Extension = contentType.split('/')[1];
//         const method2Extension = mime.extension(contentType);
//         const extension = method2Extension || method1Extension;
//         const fileName = parsedUrl.pathname.split('/').pop() || `download.${extension}`;
//         const chunks = [];
//         res.on('data', (chunk) => chunks.push(chunk));
//         res.on('end', () => {
//           const buffer = Buffer.concat(chunks);
//           resolve({ buffer, mime: contentType, extension, fileName });
//         });
//       });
//       req.on('error', (err) => {
//         reject(new Error(`Failed to download file: ${err}`));
//       });
//     });
//   });
// }
// const getdata= async () =>{
//   const {buffer, mime, extension, fileName} = await downloadFile('https://d-32.winudf.com/b/XAPK/Y29tLmZhY2Vib29rLmthdGFuYV80NDA2MTQxMDFfNDJlMjE5ODk?_fn=RmFjZWJvb2tfNDA4LjEuMC4zNi4xMDNfQXBrcHVyZS54YXBr&_p=Y29tLmZhY2Vib29rLmthdGFuYQ%3D%3D&download_id=1436302331633397&is_hot=false&k=f543c4c86061b83fa3b6b3e7ee6cb9f9642d268c&uu=http%3A%2F%2F172.16.56.1%2Fb%2FXAPK%2FY29tLmZhY2Vib29rLmthdGFuYV80NDA2MTQxMDFfNDJlMjE5ODk%3Fk%3Dc21934332645a5b1e95e0f251eb749ed642d268c')
//    console.log(`buffer ${buffer}`)
//    console.log(`filename ${fileName}`)
//    console.log(`extension ${extension}`)
//    console.log(`mime ${mime}`)
// }
// getdata()
const axios = require('axios')
const urls = require('url');
const path = require('path');
const mime = require('mime');
let downloadv1 = require('./downloadv1.js')

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
      let extension =''
      const contentType = res.headers['content-type']
      
       
      await client.sendMessage(
        id, 
        {
            document: res.data,
            mimetype: res.headers['content-type'],
            fileName:`${name || fileName}`, 
 
        }
        
    )
     return  {
      document: res.data,
      mimetype: res.headers['content-type'],
      fileName:`${fileName}.${exten ||extension}`,
      caption: caption || 'Talha Downloader' 
      }
    } catch (err) {
    
      console.log(err);
    }
  };
module.exports = getData
