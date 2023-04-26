$(function () {
  let signupForm = $('#signup-form').parsley({
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorsWrapper: '<span class="invalid-feedback"></span>',
    errorTemplate: '<span></span>',
    trigger: 'focusin'
  });

  let loginForm = $('#login-form').parsley({
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorsWrapper: '<span class="invalid-feedback"></span>',
    errorTemplate: '<span></span>',
    trigger: 'focusin'
  });

  // Function to display popover on hover
  function displayPopover(el) {
    el.$element.popover('dispose');
    el.$element.popover({
      container: 'body',
      content: function () {
        return el.$element.parsley().getErrorsMessages().join("<br>");
      },
      html: true,
      trigger: 'hover'
    }).popover('show');
  }

  // Initialize popover for signup form
  signupForm.on('field:error', function (el) {
    displayPopover(el);
    el.$element.on('mouseenter', function () {
      displayPopover(el);
    });
    el.$element.on('mouseleave', function () {
      el.$element.popover('dispose');
    });
  }).on('field:success', function (el) {
    el.$element.popover('dispose');
  });

  // Initialize popover for login form
  loginForm.on('field:error', function (el) {
    displayPopover(el);
    el.$element.on('mouseenter', function () {
      displayPopover(el);
    });
    el.$element.on('mouseleave', function () {
      el.$element.popover('dispose');
    });
  }).on('field:success', function (el) {
    el.$element.popover('dispose');
  });
});


/*Signup and Login via AJAX*/

//Display Response Text function
function displayMessage(message) {
  $('#response-message').append('<p>' + message + '</p>');
  setTimeout(function () {
    $('#response-message').find('p').remove();
  }, 10000);
}

$(function () {
  $('#signup-form').on('submit', function (e) {
    e.preventDefault(); // prevent the form from submitting normally
    let formData = $(this).serialize(); // get the form data
    $.ajax({
      type: 'POST',
      url: '/join-us/signup',
      data: formData,
      success: function (response) {
        switch (response.type) {
          case 'InvalidEmail':
            displayMessage(response.error);
            break;
          case 'PasswordMismatch':
            displayMessage(response.error);
            break;
          case 'SignupSuccess':
            displayMessage(response.success);
            $('#pills-login-tab').tab('show');
            break;
          case 'UserExist':
            displayMessage(response.error);
            $('#pills-login-tab').tab('show');
            break;
          default:
            location.reload();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  })
});