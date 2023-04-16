require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

const open_api_key = process.env.API_KEY
module.exports = voicer = async(client, id, path, callback)=>{
 console.log(path)
const filepath = path
const model = 'whisper-1'

const formData = new FormData()
formData.append('model', model)
formData.append('file',fs.createReadStream(filepath))

axios.post('https://api.openai.com/v1/audio/transcriptions' , formData , {
headers:{
authorization: `Bearer ${open_api_key}`,
'Content-Type' : `multipart/form-data; Boundary=${formData._boundary}`
}
})
.then((res) =>{
console.log(res.data)
callback(res.data.text)
})
}