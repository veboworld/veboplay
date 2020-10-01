      $('.v-nav-h').click(function() {
        $('.v-container').toggleClass( 'scaled' );
        $('.v-overlay').toggleClass( 'hidden' );
      });
      $('.v-overlay').click(function() {
        $('.v-container').toggleClass( 'scaled' );
        $('.v-overlay').toggleClass( 'hidden' );
      });
      $('.fullscreen').click(function() {
        document.body.webkitRequestFullscreen();
      });
$
      fetch('https://dev.to/api/articles'+window.location.search).then(res => {
        return res.json();
      }).then(res => {
        res.forEach(item => {

          // console.log(item)
          $('#posts').append(
            `<?php echo file_get_contents('post.tmpl.html'); ?>`
            );

        })
      }).then(() => {
       $('#postbs').masonry({
          itemSelector: '.post-item',
        })
      })