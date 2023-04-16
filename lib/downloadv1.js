const axios = require('axios');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mimes = require('mime-types');

const pipeline = promisify(require('stream').pipeline);

module.exports = downloadFile = async (client, id, url, outputDir, caption) => {
    console.log('running download v1');
    try {
        const agent = url.startsWith('https') ? new https.Agent({ rejectUnauthorized: false }) : new http.Agent();
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            httpsAgent: agent,
            httpAgent: agent,
        });
        const fileName = getFileNameFromUrl(url);
        const extension = getExtensionFromMime(response.headers['content-type']) || getExtensionFromUrl(url);
        const filePath = path.join(outputDir, `${fileName}.${extension}`);

        try {
            await pipeline(response.data, fs.createWriteStream(filePath));
        } catch (error) {
            console.error(`Error while downloading file: ${error.message}`);
            return;
        }

        const bufferSize = 10240; // set the size of the buffer as needed

        const stream = fs.createReadStream(filePath, { highWaterMark: bufferSize });

        let buffer = Buffer.alloc(0);

        stream.on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);
        });

        stream.on('end', async () => {
            try {
                await client.sendMessage(
                    id,
                    {
                        document: buffer,
                        mimetype: response.headers['content-type'],
                        fileName: `${fileName}.${extension}`,
                        caption: caption,
                    }
                );
                fs.unlinkSync(filePath);
            } catch (error) {
                console.error(`Error while sending message: ${error.message}`);
            }
        });

        console.log(`File downloaded successfully at ${filePath}`);
        console.log(`File extension: ${extension}`);
        console.log(`Mime type: ${response.headers['content-type']}`);
    } catch (error){
        console.log(`Downloading file from ${url}`);
        try {
            const agent = url.startsWith('https') ? new https.Agent({ rejectUnauthorized: false }) : new http.Agent();
            const request = url.startsWith('https') ? https.get(url, { agent }) : http.get(url, { agent });
            const fileName = getFileNameFromUrl(url);
            request.on('error', (err) => {
                console.error(`Error while downloading file with http.get method: ${err.message}`);
            });
            request.on('response', (response) => {
                const extension = getExtensionFromMime(response.headers['content-type']) || getExtensionFromUrl(url);
                const filePath = path.join(outputDir, `${fileName}.${extension}`);
                if (response.statusCode !== 200) {
                    console.error(`Error while downloading file with http.get method: ${response.statusCode} ${response.statusMessage}`);
                    return;
                }
        
                const stream = fs.createWriteStream(filePath);
                stream.on('error', (err) => {
                    console.error(`Error while writing file: ${err.message}`);
                    fs.unlinkSync(filePath);
                });
                response.pipe(stream);
                stream.on('finish', async () => {
                    const bufferSize = 10240; // set the size of the buffer as needed
        
                    const stream = fs.createReadStream(filePath, { highWaterMark: bufferSize });
        
                    let buffer = Buffer.alloc(0);
        
                    stream.on('data', (chunk) => {
                        buffer = Buffer.concat([buffer, chunk]);
                    });
        
                    stream.on('end', async () => {
                        try {
                            await aclient.sendMessage(
                                id,
                                {
                                    document: buffer,
                                    mimetype: response.headers['content-type'],
                                    fileName: `${fileName}.${extension}`,
                                    caption: caption,
                                }
                            )
                            console.log(`File downloaded successfully at ${filePath}`);
                            console.log(`File extension: ${extension}`);
                            console.log(`Mime type: ${response.headers['content-type']}`);
                            fs.unlinkSync(filePath);
                        } catch (err) {
                            console.error(`Error while sending message: ${err.message}`);
                            fs.unlinkSync(filePath);
                        }
                    });
                });
            });
        } catch (err) {
            console.error(`Error while downloading file: ${err.message}`);
        }
        
    }
};

const getFileNameFromUrl = (url) => {
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const fileName = lastPart.split('?')[0];
    return fileName;
};

const getExtensionFromMime = (mime) => {
    return mime ? mimes.extension(mime) : false;
};

const getExtensionFromUrl = (url) => {
    const urlParts = url.split('.');
    const extension = urlParts[urlParts.length - 1];
    return extension;
};



