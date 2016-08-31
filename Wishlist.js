;(function (Wishlist, $) {

  var $headerWishlistLink = $('.item--link.link-wishlist');
  var $wishlistButton = $('.wishlist-btn');
  var $wishlistTile = $('.wishlist-tile');
  var numProductTiles = $wishlistTile.length;
  var wishlist = localStorage.getItem('user_wishlist') || [];
  if (wishlist.length > 0) {
    wishlist = JSON.parse(localStorage.getItem('user_wishlist'));
  }

  /*
   * Update button and header icon to show current state
   */   
  var animateWishlist = function (self) {
    /* Turn icon gold for active */
    $(self).toggleClass('is-active');
    /* Blink Header Wishlist icon */
    $headerWishlistLink.addClass('is-active');
    setTimeout(function () {
      $headerWishlistLink.removeClass('is-active');
    }, 400);
  };

  /*
   * Add/Remove selected item to the user's wishlist array in localStorage
   * Wishlist button class 'is-active' determines whether or not to add or remove
   * If 'is-active', remove the item, otherwise add it
   */   
  var updateWishlist = function (self) {
    var productHandle = $(self).attr('data-product-handle');
    var isRemove = $(self).hasClass('is-active');
    /* Remove */
    if (isRemove) {
      var removeIndex = wishlist.indexOf(productHandle);
      wishlist.splice(removeIndex, 1);
      localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    }
    /* Add */ 
    else {
      wishlist.push(productHandle);
      localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    }
    console.log(JSON.stringify(wishlist));
  };

  /*
   * Loop through wishlist buttons and activate any items that are already in user's wishlist
   * Activate by adding class 'is-active'
   * Run on initialization
   */   
  var activateItemsInWishlist = function () {
    $wishlistButton.each(function () {
      var productHandle = $(this).attr('data-product-handle');
      if (wishlist.indexOf(productHandle) > -1) {
        $(this).addClass('is-active');
      }
    });
  };

  /*
   * Loop through product titles and remove any that aren't a part of the wishlist
   * Decrement numProductTiles on removal
   */   
  var displayOnlyWishlistItems = function () {
    $wishlistTile.each(function () {
      var productHandle = $(this).attr('data-product-handle');
      if (wishlist.indexOf(productHandle) === -1) {
        $(this).remove();
        numProductTiles--;
      }
    });
  };

  /*
   * Check if on the wishlist page and hide any items that aren't a part of the wishlist
   * If no wishlist items exist, show the empty wishlist notice
   */   
  var loadWishlist = function () {
    if (window.location.href.indexOf('pages/wishlist')) {
      displayOnlyWishlistItems();
      $('.wishlist-loader').fadeOut(2000, function () {
        $('.wishlist-grid').addClass('is_visible');
        $('.wishlist-hero').addClass('is_visible');
        $('.wishlist-hero--title').addClass('animated fadeInUp');
        if (numProductTiles == 0) {
          $('.wishlist-grid--empty-list').addClass('is_visible animated fadeInUp');
        } else {
          $('.wishlist-grid--empty-list').hide();
          /* Force fade-in animation */
          $('html, body').scrollTop(1).scrollTop(0);
        }
      });
    }
  };

  var bindUIActions = function () {
    $wishlistButton.click(function (e) {
      e.preventDefault();
      updateWishlist(this);
      animateWishlist(this);
    });
  };

  Wishlist.init = function () {
    bindUIActions();
    activateItemsInWishlist();
    loadWishlist();
  };

}(window.Wishlist = window.Wishlist || {}, jQuery, undefined));
