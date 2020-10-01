const fs = require('fs');
const svg2img = require('svg2img');
const btoa = require('btoa');

let oldWidth,
    oldHeight,
    aspectRatio,
    newWidth,
    newHeight;

oldWidth = 1024;
oldHeight = 768;

for (let newWidth of process.argv.slice(2)) {
  console.log('Make PNG logo with ' + newWidth + 'px width');

  newWidth = parseInt(newWidth);

  aspectRatio = ( oldWidth / oldHeight );
  newHeight = ( newWidth / aspectRatio );

  svg2img(__dirname+'/../images/logo.svg', {width: newWidth, height: newHeight, preserveAspectRatio:true}, (error, buffer) => {
    fs.writeFileSync(`docs/images/logo-${newWidth}.png`, buffer);
  });

  console.log(`Your image is here docs/images/logo-${newWidth}.png`);
}