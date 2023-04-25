const https = require('https');
const querystring = require('querystring');
const fs = require('fs')
const { XMLParser } = require('fast-xml-parser')


const getData = (number, callback) => { // add a callback parameter
  const data = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><InteractGetOffers xmlns="http://tempuri.org/" id="o0" c:root="1"><MSISDN i:type="d:string">${number}</MSISDN></InteractGetOffers></v:Body></v:Envelope>`
  const options = {
    hostname: 'selfcareapp.ufone.com',
    port: 443,
    path: '/SelfCareApp/service.asmx',
    method: 'POST',
    headers: {
      'Connection': 'keep-alive',
      'User-Agent': 'kSOAP/2.0',
      'SOAPAction': 'http://tempuri.org/InteractGetOffers',
      'Content-Type': 'text/xml;charset=utf-8',
      'Content-Length': data.length,
      'Accept-Encoding': 'gzip'
    }
  };
  let datanew = {};
  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    let chunks = [];
    res.on('data', async (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const zlib = require('zlib');

      // the compressed buffer
      const decompressed = zlib.gunzipSync(chunks[0]); // decompress the buffer
      const text = decompressed.toString('utf8'); // convert the decompressed buffer into a string
      const parser = new XMLParser();
      const json = parser.parse(text)

      // const data = json['soap:Envelope']['soap:Body'].InteractGetOffersResponse.InteractGetOffersResult
      const data = json['soap:Envelope']['soap:Body'].InteractGetOffersResponse.InteractGetOffersResult
      // const retur = json.data[0]

      // datanew = retur

      callback(JSON.parse(data).data[0]) // call the callback with the data
    });
  });

  req.on('error', (error) => {
    console.error(error);
    callback(error) // call the callback with the error
  });

  req.write(data);
  req.end();

}


const activate = (number, treatmentcode, offercode, acceptfcname, apid, callback) => { // add a callback parameter

  const data = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><InteractSubscribeOffer xmlns="http://tempuri.org/" id="o0" c:root="1"><MSISDN i:type="d:string">${number}</MSISDN><TreatmentCode i:type="d:string">${treatmentcode}</TreatmentCode><ApID i:type="d:string">${apid}</ApID><OfferCode i:type="d:string">${offercode}</OfferCode><ValidityNoOfDays i:type="d:string">7</ValidityNoOfDays><OfferType i:type="d:string">1</OfferType><AcceptFlowChartName i:type="d:string">${acceptfcname}</AcceptFlowChartName></InteractSubscribeOffer></v:Body></v:Envelope>
  `
  try {
    const options = {
      hostname: 'selfcareapp.ufone.com',
      port: 443,
      path: '/SelfCareApp/service.asmx',
      method: 'POST',
      headers: {
        'Connection': 'keep-alive',
        'User-Agent': 'kSOAP/2.0',
        'SOAPAction': 'http://tempuri.org/InteractSubscribeOffer',
        'Content-Type': 'text/xml;charset=utf-8',
        'Content-Length': data.length,
        'Accept-Encoding': 'gzip'
      }
    };
    let datanew = {};
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      let chunks = [];
      res.on('data', async (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const zlib = require('zlib');

        // the compressed buffer
        const decompressed = zlib.gunzipSync(chunks[0]); // decompress the buffer
        const text = decompressed.toString('utf8'); // convert the decompressed buffer into a string
        const parser = new XMLParser();

        const json = parser.parse(text)
        const data = json['soap:Envelope']['soap:Body'].InteractSubscribeOfferResponse.InteractSubscribeOfferResult



        callback(JSON.parse(data)) // call the callback with the data
      });
    });

    req.on('error', (error) => {
      console.error(error);
      callback(error) // call the callback with the error
    });

    req.write(data);
    req.end();
  } catch (err) {
    console.log(err)
    callback({ data: 'lol' })
  }

}

const activate2 = ( num , treatmentcode , offercode , acceptfcname, client, m,code, callback) =>{
  if (!treatmentcode || !offercode || !acceptfcname) {
    callback(false)
    client.sendMessage(m.sender, { text: 'Sorry no offer available for now. Try again later if already not subcribe' }, { quoted: m })
    return

  }
activate(num, treatmentcode, offercode, acceptfcname, code, (data) => {
    

    if (data.data[0].status == 'Failure') {
      client.sendMessage(m.sender, { text: ' already subcribed' })
      callback(false)
      return false
    } else {

      const message = `📶Activated 1 GB for 7 days.\n' +
      '🗞️Join my group for latest news👉https://chat.whatsapp.com/KgV6s56nybbDYUKe5onamS \n' +
      '\n' +
      "Hi there! 👋 I'm your personal AI assistant 🤖. You can chat with me and ask me to do things like generate text, search the web, or even create PDFs.\n" +
      '\n' +
      'Here are some of the things I can do:\n' +
      '\n' +
      '🧠 /ai <text> - generate text using AI\n' +
      '🔍 /google <text> - search on Google\n' +
      '🖼️ /img <text> - search for an image\n' +
      '🔗 /pdfweb <link> - convert a webpage to PDF\n' +
      '📷 /ss <link> - take a screenshot of a webpage\n' +
      '📷 /insta <link> - save an Instagram photo or video\n' +
      '💾 /save <download link> - download a file\n' +
      '📄 /pdf <text> - generate a PDF from text\n' +
      '🔊 /tts <text> - convert text to speech\n' +
      '🎥 /video <text or YouTube link> - search for a video on YouTube\n' +
      '🧹 /clear - clear the chat history\n' +
      '🔎 /whois <whois> - lookup WHOIS information\n' +
      '📱 /ufone - get free 1GB internet data\n' +
      '📷 /ocr <image> - extract text from an image using OCR\n' +
      '📝 /data - view previous chats with me\n' +
      '\n' +
      'My advanced features include:\n' +
      '\n' +
      "1️⃣ I can reply to your pictures and audio messages without any command. Just send them over, and I'll analyze them for you
! 📷 🎤\n" +
      '2️⃣ I can answer your queries related to the weather conditions of any location you want. 🌨️☀️\n' +
      '3️⃣ I can perform language detection and translation for you, making communication between different languages easy! 🌍🗣️\
n' +
      "4️⃣ I can analyze the sentiment behind a sentence. So tell me how you feel, and I'll understand it! 🤔😊😔\n" +
      '\n' +
      "🌹 Don't hesitate to ask me anything! I'm here to help you out ❤️🖤.`;

      client.sendMessage(m.sender, { text: message }, { quoted: m })

      callback(true)
    }
  })

}
// use the function with a callback
module.exports = package = (client, m, num, callback) => {
  num = `92${num.split('').splice(1).join('')}`
  getData(num, (data) => {
    console.log(data)

    const treatmentcode = data.treatmentcode.split(',')[0]
    const offercode = data.offercode.split(',')[0]
    const acceptfcname = data.acceptfcname.split(',')[0]
    activate2( num , treatmentcode ,offercode, acceptfcname , client, m , '46407581', callback)
    activate2( num , treatmentcode ,offercode, acceptfcname , client, m , '46407582', callback)
    if( data.treatmentcode.split(',')[1]){
    const treatmentcode = data.treatmentcode.split(',')[1]
    const offercode = data.offercode.split(',')[1]
    const acceptfcname = data.acceptfcname.split(',')[1]
    activate2( num , treatmentcode ,offercode, acceptfcname , client, m, '46407582' , callback)
    activate2( num , treatmentcode ,offercode, acceptfcname , client, m , '46407582', callback)
    }
  

  })
}


