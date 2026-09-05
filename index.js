const fs = require('fs');

const readable = fs.createReadStream('datos.txt');
const writable = fs.createWriteStream('salida_backpressure.txt');

readable.on('data', chunk => {
  if (!writable.write(chunk)) {
    readable.pause();
  }
});

writable.on('drain', () => readable.resume());