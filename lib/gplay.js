const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs')
const getFileNameFromUrl = (url) => {
  const urlParts = url.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  const fileName = lastPart.split('?')[0];
  return fileName;
};

module.exports =func= async (client, id,url,time ) => {
  
  const browser = await puppeteer.launch({ headless: true , args: ['--no-sandbox']  });
  const page = await browser.newPage();
  const fileName = getFileNameFromUrl(url)
  // Navigate to the webpage you want to convert
  await page.goto(url);
  setTimeout(async()=>{
 // Generate the PDF and save it in the main directory
  const outputPath = path.join(__dirname, 'files',`${fileName}.pdf`);
  await page.pdf({ path: outputPath, format: 'A4' });
  let buffer = fs.readFileSync(path.join(__dirname, 'files',`${fileName}.pdf`))
  
  await client.sendMessage(id,{
    document: buffer,
    fileName: `${fileName}.pdf`,
  })
  fs.unlinkSync(path.join(__dirname, 'files',`${fileName}.pdf`))
  await browser.close();
},time)

}
