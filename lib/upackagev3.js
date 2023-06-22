const https = require('https');
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
    if(res.statusCode != 200) return callback({data:429})

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

      const data = json['soap:Envelope']['soap:Body'].InteractGetOffersResponse.InteractGetOffersResult
      callback(JSON.parse(data).data[0]) // call the callback with the data
    });
  });

  req.on('error', (error) => {
    console.error('error from request on getting data ......' );
    callback(error) // call the callback with the error
  });

  req.write(data);
  req.end();

}


const activate = (number, treatmentcode, offercode, acceptfcname, apid, callback) => { // add a callback parameter

  const data = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"><v:Header /><v:Body><InteractSubscribeOffer xmlns="http://tempuri.org/" id="o0" c:root="1"><MSISDN i:type="d:string">${number}</MSISDN><TreatmentCode i:type="d:string">${treatmentcode}</TreatmentCode><ApID i:type="d:string">${apid}</ApID><OfferCode i:type="d:string">${offercode}</OfferCode><ValidityNoOfDays i:type="d:string">7</ValidityNoOfDays><OfferType i:type="d:string">1</OfferType><AcceptFlowChartName i:type="d:string">${acceptfcname}</AcceptFlowChartName></InteractSubscribeOffer></v:Body></v:Envelope>
  `
  console.log(number, offercode, treatmentcode, acceptfcname, callback, 'from activate')
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
    if(res.statusCode != 200) return callback({data:429})
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
    console.error('error from request on activating ......' );
    callback(error) // call the callback with the error
  });

  req.write(data);
  req.end();

}
// use the function with a callback
const package = async ( num, callback) => {
  num = `92${num.split('').splice(1).join('')}`
  getData(num, (data) => {
    const treatmentcode = data.treatmentcode.split(',')[0]
    const offercode = data.offercode.split(',')[0]
    const acceptfcname = data.acceptfcname.split(',')[0]
    if (!treatmentcode || !offercode || !acceptfcname) {
      callback(false)
      return
    }
    console.log(data)
    activate(num, treatmentcode, offercode, acceptfcname, '46407582', (data) => {

     if(data.treatmentcode.split(',')[1]) {
    const treatmentcode1 = data.treatmentcode.split(',')[1]
    const offercode1 = data.offercode.split(',')[1]
    const acceptfcname1 = data.acceptfcname.split(',')[1]
      activate(num, treatmentcode1, offercode1, acceptfcname1, '46407581', (data) => {
        if (data.data[0].status == 'Failure') {
          callback(false)
          return false
        } else {
          callback(true)
        }
      })
     }

      if(data.data == 429) return false

      if (data.data[0].status == 'Failure') {
       callback(false)
        return false
      } else {
        callback(true)
      }
    })
   
  })
}
package('03348879157',(res)=>{
  console.log(res)
})