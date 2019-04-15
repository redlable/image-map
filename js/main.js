"use strict";

var anchorHash = window.location.hash;

// delete hash so the page won't scroll to it
if (window.location.hash.length) {
  window.location.hash = "";
}

(function ($) {
  'use strict';

  // Detect IE browser.

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0) {
    $('body').addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $('body').addClass('ie ie11');
  }

  // Detect Firefox.
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $('body').addClass('firefox');
  }

  // Detect Safari browser.!
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $('body').addClass('safari');
  }

  // Detect mobile device.
  function isTouchDevice() {
    var $body = $('body');

    if ('ontouchstart' in document) {
      $body.addClass('mobile');

      if (/iP(hone|od|ad)/i.test(navigator.userAgent)) {
        $body.addClass('ios');
      }

      return true;
    }
  }

  isTouchDevice();

  // Toggle mobile and desktop behavior
  var $body = $('body');

  window.innerWidth < 1024 ? $body.addClass('mobile-behavior') : $body.addClass('desktop-behavior');

  $.resizeAction(function () {
    return window.innerWidth < 1024;
  }, function (isTrue) {
    isTrue ? $body.removeClass('desktop-behavior').addClass('mobile-behavior') : $body.removeClass('mobile-behavior').addClass('desktop-behavior');
    !isTrue ? $body.removeClass('active-menu') : '';
  });

  // Anchors
  (function () {
    var $root = $('html, body'),
        $window = $(window),
        $document = $(document),
        $body = $('body');

    // to top right away
    if (window.location.hash) scroll(0, 0);
    // void some browsers issue
    // setTimeout(function() { scroll(0,0); }, 1);

    $window.on('load', function () {
      var adminMenuHeight = parseInt($body.css('padding-top')) || 0,
          headerHeight = $('#header').outerHeight(),
          fixedHeaderHeight = $window.width() >= 1024 ? headerHeight - 20 : 0;

      // *only* if we have anchor on the url
      if (anchorHash) {

        // smooth scroll to the anchor id
        $root.animate({
          scrollTop: $(anchorHash).offset().top - adminMenuHeight - fixedHeaderHeight
        }, 800, 'swing');

        window.location.hash = anchorHash;
      }
    });

    $('a[href^=\\#]').on('click', function (e) {
      e.preventDefault();

      var $scrollEl = $(this.hash),
          scrollElOffset = Math.round($scrollEl.offset().top),
          adminMenuHeight = parseInt($body.css('padding-top')),
          headerHeight = $('#header').outerHeight(),
          fixedHeaderHeight = $window.width() >= 1024 ? headerHeight - 20 : 0,
          speed = 400;

      if (scrollElOffset > $document.scrollTop() + $window.height()) {
        speed = 800;
      }

      $root.animate({
        scrollTop: scrollElOffset - adminMenuHeight - fixedHeaderHeight
      }, speed);
    });

    // Stop scroll animation on user scroll
    $window.on('touchmove mousewheel', function () {
      $root.stop();
    });
  })();

  // Sliders
  (function slider() {
    var $slider = $('.slider');

    if ($slider.children().length > 1) {
      $slider.each(function () {
        var $slider = $(this),
            options = {
          autoplay: true,
          autoplaySpeed: 8000,
          arrows: false,
          dots: true,
          fade: true,
          speed: 1000
        };

        $slider.slick(options);
      });
    }

    // Guide slider
    var $guideSlider = $('.guide-slider').find('.step-container'),
        guideSliderOpt = {
      arrows: false,
      infinite: false
    };

    if (window.innerWidth < 768) {
      $guideSlider.slick(guideSliderOpt);
    }

    $.resizeAction(function () {
      return window.innerWidth < 768;
    }, function (isTrue) {
      if (!isTrue) {

        $guideSlider.slick('unslick');
      } else {
        if (!$guideSlider.is('.slick-initialized')) {
          $guideSlider.slick(guideSliderOpt);
        }
      }
    });
  })();

  // Accordion
  (function accordion() {
    $('.faq-header').on('click', function () {
      var $this = $(this);

      $this.closest('.faq-item').siblings().removeClass('active').find('.faq-content').slideUp();

      $this.siblings('.faq-content').slideToggle(400, function () {
        var self = $(this);

        if (self.is(':visible') && self.find('iframe').length) {
          self.find('iframe').each(function (i, el) {
            var iframe = $(el);

            if (!iframe.is('.refreshed')) {
              iframe.attr('src', iframe.attr('src'));
              iframe.addClass('refreshed');
            }
          });
        }
      }).closest('.faq-item').toggleClass('active');
    });

    $('.faq-item').each(function (i, el) {
      $(el).css('transition-delay', i * .1 + 's');
    });
  })();

  // Scroll animations
  (function scrollAnimaiton() {
    var $sections = $('.content-container').children();
    var $rowTitle = $('.group-title');
    var $rowList = $('.step-item');

    $sections.add($rowList).add($rowTitle).each(function (i, el) {
      var $el = $(el);

      if ($el.isVisible(true)) {
        $el.addClass('in-view');
      }
    });

    $(window).on('scroll', function () {
      var $window = $(window);
      var sixthWinHeight = $window.height() / 6;
      var viewTop = $window.scrollTop();
      var viewBottom = viewTop + $window.height();

      $sections.add($rowList).add($rowTitle).each(function (i, el) {
        var $el = $(el);
        var elemTopPos = $el.offset().top;

        if ($el.isVisible(true) && elemTopPos < viewBottom - sixthWinHeight) {
          $el.addClass("in-view");
        }
      });
    });

    // Sticky header
    var $header = $('#header');

    if (window.scrollY > 0) {
      $header.addClass('sticky');
    }

    $.scrollAction(function () {
      return $(window).scrollTop() > 0;
    }, function (isTrue) {
      isTrue ? $header.addClass('sticky') : $header.removeClass('sticky');
    });
  })();

  // Mobile menu
  (function mobileMenu() {
    var $header = $('#header');
    var $mobMenuBtn = $('.hamburger-btn');
    var $closeMenuBtn = $('.close-menu');

    $mobMenuBtn.on('click', function () {
      $header.addClass('active-menu');
    });

    $closeMenuBtn.on('click', function () {
      $header.removeClass('active-menu');
    });
  })();

  // Toggle status messages
  (function toggleMessage() {
    $('.message').on('click', function (e) {
      if (!$(e.target).is('a')) {
        $(this).toggleClass('hidden-msg');
      }
    });
  })();

  (function imageMap() {
    var $imageMap = $('.image-map'),
        $graphic = $('.graphic');

    $imageMap.on('click', function (e) {
      var $this = $(this),
          $target = $(e.target),
          $activeGraph = $('.' + $target.attr('alt'));

      if (!$activeGraph.is(':visible')) {
        $graphic.fadeOut();
        $activeGraph.fadeIn();
      }
    });

    $('.clear').on('click', function () {
      $graphic.fadeOut();
      $('.graphic.default').fadeIn();
    });

    $imageMap.imageMapResize();
  })();
})(jQuery);
//# sourceMappingURL=main.js.map
