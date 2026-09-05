const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('entrada.txt');
const writeStream = fs.createWriteStream('entrada.txt.gz');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

writeStream.on('finish', () => console.log('Archivo comprimido exitosamente.'));