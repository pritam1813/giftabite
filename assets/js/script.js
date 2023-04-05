//Navbar
$(document).ready(function () {

    /*Setting active page link color*/

    // Get current URL path and assign 'active' class to corresponding navbar link
    let pathname = window.location.pathname;
    $('.navbar-nav > li > a[href="' + pathname + '"]').addClass('active');

    // Add click event listener to navbar links
    $('.navbar-nav > li > a').on('click', function () {
        // Navigate to corresponding page
        window.location = $(this).attr('href');
        $(this).addClass('active');
        $('.navbar-nav > li > a').removeClass('active');
    });
});

