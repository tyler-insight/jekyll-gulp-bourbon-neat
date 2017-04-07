/* ----- Set Velocity.js Animations ----- */
$.Velocity
  .RegisterEffect("transition.fadeIn", {
    defaultDuration: 700,
    calls: [
      [{
        opacity: 1,
        translateY: '0px'
      }]
    ]
  });
$.Velocity
  .RegisterEffect("transition.fadeOut", {
    defaultDuration: 700,
    calls: [
      [{
        opacity: 0,
        translateY: '10rem'
      }]
    ],
    reset: {
      translateY: '10rem'
    }
  });

$(function() {
  var changedPage = false,

    /* ----- Do this when a page loads ----- */
    init = function() {
      console.log("Initializing scripts");

      /* ----- Runs function for setting divs to equal height ----- */
      equalHeight();

      /* ----- This is where I would run any page specific functions ----- */

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
          $("#content").load(url + " #content", function() {
            $('#content').velocity("transition.fadeIn", {
              visibility: 'visible',
              complete: function() {
                console.log("Ajax Loaded");
                ajaxLoad();

              }
            });
          });
        }
      });

      /* ----- Animate new content in ----- */


    };

  /* ----- This runs on the first page load with no ajax ----- */
  init();
  navigation();

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

      if (url == '/') {
        document.title = "Sitename";
      } else {
        document.title = title + " - Sitename";
      }

      loadPage(url);
      return false;
    }

  });

  /* ----- Sets divs in same row with .equal class so that their heights are equal ----- */
  function equalHeight() {
    $('.equal').matchHeight({
      byRow: true,
      property: 'height',
      target: null,
      remove: false
    });
  }

  function navigation() {
    var mainHeader = $('.auto-hide-header'),
      secondaryNavigation = $('.cd-secondary-nav'),
      //this applies only if secondary nav is below intro section
      belowNavHeroContent = $('.sub-nav-hero'),
      headerHeight = mainHeader.height();

    //set scrolling variables
    var scrolling = false,
      previousTop = 0,
      currentTop = 0,
      scrollDelta = 10,
      scrollOffset = 0;

    mainHeader.on('click', '.nav-trigger', function(event) {
      // open primary navigation on mobile
      event.preventDefault();
      mainHeader.toggleClass('nav-open');
    });

    mainHeader.on('click', 'a', function(event) {
      if (mainHeader.hasClass("nav-open")) {
        mainHeader.toggleClass('nav-open');
      }

    });

    $(window).on('scroll', function() {
      if (!scrolling) {
        scrolling = true;
        (!window.requestAnimationFrame) ?
        setTimeout(autoHideHeader, 250): requestAnimationFrame(autoHideHeader);
      }
    });

    $(window).on('resize', function() {
      headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
      var currentTop = $(window).scrollTop();

      (belowNavHeroContent.length > 0) ?
      checkStickyNavigation(currentTop) // secondary navigation below intro
        : checkSimpleNavigation(currentTop);

      previousTop = currentTop;
      scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
      //there's no secondary nav or secondary nav is below primary nav
      if (previousTop - currentTop > scrollDelta) {
        //if scrolling up...
        mainHeader.removeClass('is-hidden');
      } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        //if scrolling down...
        mainHeader.addClass('is-hidden');
      }
    }

    function checkStickyNavigation(currentTop) {
      //secondary nav below intro section - sticky secondary nav
      var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

      if (previousTop >= currentTop) {
        //if scrolling up...
        if (currentTop < secondaryNavOffsetTop) {
          //secondary nav is not fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('fixed slide-up');
          belowNavHeroContent.removeClass('secondary-nav-fixed');
        } else if (previousTop - currentTop > scrollDelta) {
          //secondary nav is fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('slide-up').addClass('fixed');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }

      } else {
        //if scrolling down...
        if (currentTop > secondaryNavOffsetTop + scrollOffset) {
          //hide primary nav
          mainHeader.addClass('is-hidden');
          secondaryNavigation.addClass('fixed slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        } else if (currentTop > secondaryNavOffsetTop) {
          //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.addClass('fixed').removeClass('slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }

      }
    }
  }
});
