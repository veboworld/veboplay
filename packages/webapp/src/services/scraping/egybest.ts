import url from "url";
import fetch from "node-fetch";

interface StringArray {
    [index: number]: string;
}
let res;

export default (req, res) => {
    // Set CORS headers.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    res.setHeader('Content-Type', 'application/json');

    const params = url.parse(req.url, true).query;
    const key = params['q'];

    fetch('https://egy.best/autoComplete.php?q=' + key)
        .then(res => res.json())
        .then((res: StringArray) => {
            let results: StringArray;
            results = res[key].map(item => {
                return {
                    id: item.i,
                    title: item.u.match('^(movie|series)/(.*)$')[1] == 'series' ? item.t : item.t.match('^(?<title>.*)\\s{0,2}\\([\\s]{0,3}(?<year>(19|20)\\d{2})[\\s]{0,3}\\)$')[1],
                    year: item.u.match('^(movie|series)/(.*)$')[1] == 'series' ? null : item.t.match('^(?<title>.*)\\s{0,2}\\([\\s]{0,3}(?<year>(19|20)\\d{2})[\\s]{0,3}\\)$')[2],
                    type: item.u.match('^(movie|series)/(.*)$')[1],
                    slug: item.u.match('^(movie|series)/(.*)$')[2],
                    imdb: null,
                    path: item.u,
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
            return Promise.all(
                results.map(async item => {
                    const params = {
                        apikey: '7b071990',
                    }

                    if (item.title) {
                        params.t = item.title;
                    }

                    if (item.year) {
                        params.y = item.year;
                    }

                    if (item.type) {
                        params.type = item.type;
                    }

                    let imdb = await fetch('http://www.omdbapi.com/?' + (new URLSearchParams(params)).toString())
                        .then(res => res.json())

                    item.imdb = {
                        id: await imdb.imdbID,
                        rating: await imdb.imdbRating,
                    }

                    return item
                })
            )
        })
        .then(results => {

            res.writeHead(200);
            res.write(JSON.stringify({
                success: true,
                data: results,
            }));
            res.end();
        });
}