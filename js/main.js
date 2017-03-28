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
      $("#content").load(url + " #content", ajaxLoad);
      console.log("Ajax Loaded");
    };

  /* ----- This runs on the first page load with no ajax ----- */
  init();

  $(window).on("popstate", function(e) {
    if (changedPage) loadPage(location.href);
    console.log("Popstate happened");
  });

  $(document).on('click', 'a', function() {
    var url = $(this).attr("href"),
      title = $(this).text();

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
