const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const voicer = require('./voice.js')
ffmpeg.setFfmpegPath(ffmpegPath);
module.exports = convert = async( client, id, path, callback)=>{
const oggFilePath = path;
const wavFilePath = 'file.wav';
console.log(__dirname)
ffmpeg(oggFilePath)
.output(wavFilePath)
.on('end', () => {
console.log('Conversion complete.');
voicer(client, id,wavFilePath , (res) =>{
    callback(res)
})
})
.on('error', (err) => {
console.log('Error converting file:', err);
})
.run();
}