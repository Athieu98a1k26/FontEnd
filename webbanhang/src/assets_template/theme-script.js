(function ($) {
    "use strict"; // Start of use strict

    $(window).load(function () {
        // auto width megamenu
        $('#form-search-opntop').hide();
        auto_width_megamenu();
        resizeTopmenu();
        $('.btn-open-mobile').click(function(){
          if($('#mainbody').hasClass('home') && !$('#nav-top-menu').hasClass('nav-ontop')){
            $('#vertical-menu-contentId').show();
          }
          else{
            $('#vertical-menu-contentId').slideToggle();
          }

        });
        $('body').click(function(e)
        {

          if ($(e.target).closest(".btn-open-mobile").length === 0 && !$('#mainbody').hasClass('home')) {
            $("#vertical-menu-contentId").hide("slow");
          }
        });

                // View grid list product
                $(document).on('click', '.display-product-option .view-as-grid', function () {
                  $(this).closest('.display-product-option').find('li').removeClass('selected');
                  $(this).addClass('selected');
                  $('.product-list li .quick-view a.heart').css('margin-top','20px');
                  $(this).closest('#view-product-list').find('.product-list').removeClass('list').addClass('grid');
                  return false;
              })
              // View list list product
              $(document).on('click', '.display-product-option .view-as-list', function () {
                  $(this).closest('.display-product-option').find('li').removeClass('selected');
                  $(this).addClass('selected');
                  $('.product-list li .quick-view a.heart').css('margin-top','0px');
                  $(this).closest('#view-product-list').find('.product-list').removeClass('grid').addClass('list');
                  return false;
              })
    });
    $(window).resize(function () {
        // auto width megamenu
        auto_width_megamenu();
        // Remove menu ontop
        remove_menu_ontop();
        // resize top menu
        resizeTopmenu();
    });
    /* ---------------------------------------------
     Scripts scroll
     --------------------------------------------- */
    $(window).scroll(function () {
        resizeTopmenu();

        // /* Show hide scrolltop button */
        // if ($(window).scrollTop() == 0) {
        //     $('.scroll_top').stop(false, true).fadeOut(600);
        // } else {
        //     $('.scroll_top').stop(false, true).fadeIn(600);
        // }
        /* Main menu on top */
        var h = $(window).scrollTop();
        var max_h = $('#header').height() + $('#top-banner').height();
        var width = $(window).width();
        var vertical_menu_height = $('#box-vertical-megamenus .box-vertical-megamenus').innerHeight();
        //console.log(vertical_menu_height);
        if (width > 767) {
            if (h > (max_h + vertical_menu_height) - 50) {
                // fix top menu
                $('#nav-top-menu').addClass('nav-ontop');
                //$('#nav-top-menu').find('.vertical-menu-content').hide();
                //$('#nav-top-menu').find('.title').removeClass('active');
                // add cart box on top menu
                $('#cart-block .cart-block').appendTo('#shopping-cart-box-ontop .shopping-cart-box-ontop-content');
                $('#shopping-cart-box-ontop').fadeIn();
                $('#user-info-top').appendTo('#user-info-opntop');
                $('#header .header-search-box form').appendTo('#form-search-opntop');
                $('#form-search-opntop').show();
            } else {
                $('#form-search-opntop').hide();
                $('#nav-top-menu').removeClass('nav-ontop');
                if ($('body').hasClass('home')) {
                    $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                    if (width > 1024)
                        $('#nav-top-menu').find('.vertical-menu-content').show();
                    else {
                        $('#nav-top-menu').find('.vertical-menu-content').hide();
                    }
                    $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                }
                ///
                $('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
                $('#shopping-cart-box-ontop').fadeOut();
                $('#user-info-opntop #user-info-top').appendTo('.top-header .container');
                $('#form-search-opntop form').appendTo('#header .header-search-box');
            }
        }
    });
    /**==============================
    ***  Auto width megamenu
    ===============================**/
    function auto_width_megamenu() {
        var full_width = parseInt($('.container').innerWidth());
        //full_width = $( document ).width();
        $('.vertical-menu-content').find('.vertical-dropdown-menu').each(function () {
            $(this).width((full_width - menu_width) - 2);
        });
    }
    /**==============================
    ***  Remove menu on top
    ===============================**/
    function remove_menu_ontop() {
        var width = parseInt($(window).width());
        if (width < 768) {
            $('#nav-top-menu').removeClass('nav-ontop');
            if ($('body').hasClass('home')) {
                if (width > 1024)
                    $('#nav-top-menu').find('.vertical-menu-content').show();
                else {
                    $('#nav-top-menu').find('.vertical-menu-content').hide();
                }
            }
            ///
            $('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
            $('#shopping-cart-box-ontop').fadeOut();
            $('#user-info-opntop #user-info-top').appendTo('.top-header .container');
            $('#form-search-opntop form').appendTo('#header .header-search-box');
        }
    }
    /* Top menu*/
    function scrollCompensate() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = parseInt(inner.offsetWidth);
        outer.style.overflow = 'scroll';
        var w2 = parseInt(inner.offsetWidth);
        if (w1 == w2) w2 = outer.clientWidth;
        document.body.removeChild(outer);
        return (w1 - w2);
    }

    function resizeTopmenu() {
        if ($(window).width() + scrollCompensate() >= 768) {
            var main_menu_w = $('#main-menus .navbar').innerWidth();
            $("#main-menus ul.mega_dropdown").each(function () {
                var menu_width = $(this).innerWidth();
                var offset_left = $(this).position().left;
                if (menu_width > main_menu_w) {
                    $(this).css('width', main_menu_w + 'px');
                    $(this).css('left', '0');
                } else {
                    if ((menu_width + offset_left) > main_menu_w) {
                        var t = main_menu_w - menu_width;
                        var left = parseInt((t / 2));
                        $(this).css('left', left);
                    }
                }
            });
        }

        if ($(window).width() + scrollCompensate() < 1025) {
            $("#main-menus li.dropdown:not(.active) >a").attr('data-toggle', 'dropdown');
        } else {
            $("#main-menus li.dropdown >a").removeAttr('data-toggle');
        }
    }
})(jQuery); // End of use strict
