$(document).ready(function () {
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








