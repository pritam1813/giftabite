// Toggle the visibility of the address fields based on the selected radio button
$('#registered-address, #new-address').on('change', function() {
    const selectedValue = $(this).val();
    if (selectedValue === 'registered') {
      $('#registered-address-field').show();
      $('#new-address-fields').hide();
    } else if (selectedValue === 'new') {
      $('#registered-address-field').hide();
      $('#new-address-fields').show();
    }
  });