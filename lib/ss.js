const puppeteer = require('puppeteer');

module.exports= ss = async (client, id ,url) => {
  console.log('running ss')
  try {
    const browser = await puppeteer.launch({ headless: true , args: ['--no-sandbox']  });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    const links = await page.$$eval('a', links => links.map(link => ({ href: link.href || 'NULL', textContent: link.textContent || 'NULL' })));
  
    const data = []
    links.forEach((el)=>{
        data.push(`Content:${el.textContent}\n ${el.href} \n\n`)
    })
    
    const screenshot = await page.screenshot({ fullPage: true });
    const buttonMessage = {
        image: screenshot,
        caption:data.join(' ')  ,
    }
    
     await client.sendMessage(id, buttonMessage) 
    await browser.close();
  } catch (error) {
    console.error(error);
    await client.sendMessage(id, error) 
  }
}

