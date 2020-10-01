const url = require('url');
const fetch = require('node-fetch');

module.exports = (req, res) => {
  // Set CORS headers.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 
'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  res.setHeader('Content-Type', 'application/json');

  const params = url.parse(req.url,true).query;

  fetch('https://egy.best/autoComplete.php?q=' + params['q'])
  .then(res => res.json())
  .then(res => {
    let results = res[params['q']].map(item => {
      return {
        id: item.i,
        title: item.t,
        type: item.u.match('^(?<type>movie|series)/(?<path>.*)$').groups.type == 'movie' ? 'movie' : 'serie',
        path: item.u.match('^(?<type>movie|series)/(?<path>.*)$').groups.path,
        url: 'https://egy.best/' + item.u,
        posters: {
          xs: 'https://cdn-static.egybest.net/serve/movies/art-' + item.i + '-x185.jpg',
          sm: 'https://cdn-static.egybest.net/serve/movies/art-' + item.i + '-x370.jpg',
          md: 'https://cdn-static.egybest.net/serve/movies/art-' + item.i + '-x555.jpg',
          lg: 'https://cdn-static.egybest.net/serve/movies/art-' + item.i + '-x740.jpg',
          xl: 'https://cdn-static.egybest.net/serve/movies/art-' + item.i + '-x925.jpg',
        }
      }
    });
    return results;
  })
  .then(results => {

    res.writeHead(200);
    res.write(JSON.stringify(results));
    res.end();
  });
}