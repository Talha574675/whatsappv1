const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio')

axios.get('https://www.instagram.com/reel/Cs6Xsr_oFfK/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==').then(response => {
  const data = response.data;
  const $ = cheerio.load(data)
  const url = $('.x5yr21d').src
  console.log(url)
  //   fs.writeFileSync("my-file.html", data, {
//     type: "text/html",
//   })
//   // Do something with the data
});