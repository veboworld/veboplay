const fs = require('fs');
const sass = require('sass');

const file = 'veboplay'

sass.render({ file: `../src/scss/${file}.scss` }, (err, result) => {
    fs.writeFileSync(`../dist/css/${file}.css` , result);
});