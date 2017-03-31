/* ----- Set Velocity.js Animations ----- */
$.Velocity
    .RegisterEffect("transition.fadeIn", {
        defaultDuration: 700,
        calls: [
            [ { opacity: 1, translateY: '0px' } ]
        ]
    });
$.Velocity
    .RegisterEffect("transition.fadeOut", {
        defaultDuration: 700,
        calls: [
            [ { opacity: 0, translateY: '10rem' } ]
        ],
        reset: { translateY: '10rem' }
    });

$(function() {
  var changedPage = false,

    /* ----- Do this when a page loads ----- */
    init = function() {
      /* ----- This is where I would run any page specific functions ----- */

      console.log("Initializing scripts");
    },

    /* ----- Do this for ajax page loads ----- */
    ajaxLoad = function(html) {
      init();

      /* ----- Here you could maybe add logic to set the HTML title to the new page title ----- */

      /* ----- Used for popState event (back/forward browser buttons) ----- */
      changedPage = true;
    },

    loadPage = function(url) {
      /* ----- Animate current content out ----- */
      $('#content').velocity("transition.fadeOut", {
            complete: function() {
              $('html').velocity("scroll", {
                duration: 0,
                easing: "ease",
                mobileHA: false
              });
              $("#content").load(url + " #content", function(){
                $('#content').velocity("transition.fadeIn", {
                  visibility: 'visible',
                      complete: function() {
                        ajaxLoad();
                        console.log("Ajax Loaded");
                      }
                  });
              });
            }
        });

      /* ----- Animate new content in ----- */


    };

  /* ----- This runs on the first page load with no ajax ----- */
  init();

  $(window).on("popstate", function(e) {
    if (changedPage) loadPage(location.href);
    console.log("Popstate happened");
  });

  /* ----- Do things on link click ----- */
  $(document).on('click', 'a', function() {
    var url = $(this).attr("href"),
      title = $(this).text();

    /* ----- Check if internal site link before doing Ajax ----- */
    if (url.indexOf(document.domain) > -1 || url.indexOf(':') === -1) {

      history.pushState({
        url: url,
        title: title
      }, title, url);

      loadPage(url);
      return false;
    }

  });
});
