const { Transform } = require('stream');
const fs = require('fs');

// Definimos el Transform Stream para pasar texto a mayúsculas
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

const readStream = fs.createReadStream('texto.txt');
const writeStream = fs.createWriteStream('texto_mayusculas.txt');

// Conectamos los flujos con pipe
readStream.pipe(transformStream).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('¡Transformación completada con éxito! Revisa texto_mayusculas.txt');
});