$("#login").click(function () {
  $.ajax({
    type: "POST",
    url: "https://quan-ly-sinh-vien-techmaster.herokuapp.com/login",
    data: {
      email: $("#username").val(),
      password: $("#password").val(),
    },
    success: function (response) {
      localStorage.setItem("fakeApiToken", response.token);
      localStorage.setItem("username", response.name);
      localStorage.setItem("id", response.id);
      window.location.href = "index.html";
    },
    error: function () {
      $("#exampleModal6").modal("show");
    },
  });
});
