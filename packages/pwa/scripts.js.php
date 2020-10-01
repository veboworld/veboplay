window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

var date = new Date();
var app = {
    base_url: "//api.themoviedb.org/3/",
    api_key: "49101d62654e71a2931722642ac07e5e",
    image_url: "//image.tmdb.org/t/p/",
    upcoming: date.getFullYear()+"-"+date.getMonth()+"-"+(date.getDate() + 1),
}

function getItems(p = '', q = null) {
    if(q) {
        // URL query builder
        var query = $.param(q);
        return fetch(app.base_url+p+"?api_key="+app.api_key+"&"+query)
    }
}


const io = new IntersectionObserver((entries) =>
            entries.forEach((entry) => {
                // set image source only when it is in the viewport
                if (entry.isIntersecting) {
                    const item = entry.target;
                    // setting image source from the dataset
                    item.querySelector('.poster').classList.remove('opacity-0');
console.log(item.dataset.tmdbid)

                    // when image is loaded, we do not need to observe it any more
                    io.unobserve(item);
                }
            })
        );

/*
getItems('discover/movie', {
    language: 'en-US',
    //sort_by: 'primary_release_date.asc',
    //include_adult: 'false',
    include_video: 'true',
    //'primary_release_date.gte': app.upcoming,
    'vote_count.gte': '10',
    'vote_average.gte': '6',
    page: '1',
})*/


/*
getItems('tv/airing_today', {
    'per_page': 4
}).then(res => {
    return res.json();
}).then(res => {
    res.results.forEach(item => {
        console.log(item)
        $('.pg-posts').append(
            `<?php echo file_get_contents('post.tmpl.html'); ?>`
        );
    })
}).then(res => {
    document.querySelectorAll(".post-item").forEach((element) => io.observe(element));
})
*/

$('.pg-nav-h').click(function() {
    $('.pg-container').toggleClass('scaled');
    $('.pg-previosly-container').toggleClass('scaled');
    $('.pg-overlay').toggleClass( 'hidden' );
});

$('.pg-nav').click(function() {
    $('.pg-container').toggleClass('scaled');
});

$('.v-overlay').click(function() {
    $('.v-container').toggleClass( 'scaled' );
    $('.v-overlay').toggleClass( 'hidden' );
});