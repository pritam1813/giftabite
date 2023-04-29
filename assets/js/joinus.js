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
        console.log(response);
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

// Implementing All States and District list using Geonames API
$(function () {
  // Fetching list of states from Geonames API using fetch
  const getStates = async () => {
    const response = await fetch('/api/geonames');
    const data = await response.json();
    return data;
  };
  
  // Fetching list of cities in a given state from Geonames API using fetch
  const getCities = async (stateGeonameId) => {
    const response = await fetch(`/api/geonames?geonameId=${stateGeonameId}`);
    const data = await response.json();
    return data;
  };

  // Populating state dropdown with list of states from Geonames API
  const stateDropdown = $('#state-label');
  getStates().then(states => {
    states.forEach(state => {
      const option = $('<option>').val(state.geonameId).text(state.name);
      stateDropdown.append(option);
    });
  });

  // Populating district dropdown based on selected state
  const districtDropdown = $('#district-label');
  stateDropdown.on('change', async () => {
    districtDropdown.empty();
    const stateGeonameId = stateDropdown.val();
    const cities = await getCities(stateGeonameId);
    cities.forEach(district => {
      const option = $('<option>').val(district.geonameId).text(district.name);
      districtDropdown.append(option);
    });
  });

});