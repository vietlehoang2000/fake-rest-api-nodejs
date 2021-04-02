$("#login").click(function () {
  console.log(`1`);
  $.ajax({
    type: "POST",
    url: "https://quan-ly-sinh-vien-techmaster.herokuapp.com/login",
    data: {
      email: "nmacdearmaid0@ucla.edu",
      password: "nmacdearmaid0",
    },
    success: function (response) {
      localStorage.setItem("fakeApiToken", response.token);
      window.location.href = "index.html";
    },
  });
});
