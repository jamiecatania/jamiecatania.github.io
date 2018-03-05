$(document).ready(function () {
    //Stop bootstrap carousel scroll until video finishes playing
    window._wq = window._wq || [];
    window._wq.push({
      id: "_all",
      options: {
        playerColor: "#56be8e"
      },
      onHasData: function(video) {
        video.bind("play", function() {
        //   console.log("'play' event fired for " + video.name() + "! 🎉");
          $('.carousel').carousel('pause');
        });
    
        video.bind("pause", function() {
            // console.log("'pause' event fired for " + video.name() + "! 🎉");
            $('.carousel').carousel();
          });
      }
    });

    // Show enlarged images in modals on click.
    	$('.post img').on('click', function() {

        //Bail on the modal for images that should link to external pages.
        if ($(this).hasClass('no-modal')) {
          return;
        }
        
        $('.enlargeImageModalSource').attr('src', $(this).attr('src'));
        $('#enlargeImageModalDesc').text($(this).next().text());
        $('#enlargeImageModal').modal('show');
    });
    
});