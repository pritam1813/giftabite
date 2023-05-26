//Display Response Text function
function displayMessage(message) {
  $(".response-message").append("<p>" + message + "</p>");
  setTimeout(function () {
    $(".response-message").find("p").remove();
  }, 10000);
}

// Update user data
$("#update-form").on("submit", function (e) {
  let formData = $(this);
  e.preventDefault();

  $.ajax({
    type: "put",
    data: formData.serialize(),
    url: "/dashboard/update",
    success: function (data) {
      displayMessage(data.message);
    },
    error: (err) => {
      console.log(err);
    },
  });
});

// Delete User Requests
$("#deleteReqLink").on("click", function (e) {
  e.preventDefault();

  let deleteLink = $(this).attr("href");

  $.ajax({
    type: "delete",
    url: deleteLink,
    success: function (response) {
      //Removing the request from request table DOM
      $(`#request-${response.data.reqeust_id}`).remove();

      //Displaying Success Message
      displayMessage(response.message);
    },
    error: function (xhr, status, error) {
      // Error handler code
      console.log("Error: " + error + " Status: " + status);
      console.log(xhr);
    },
  });
});
