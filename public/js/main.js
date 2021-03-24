//js index page

function loadDoc() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const users = JSON.parse(this.responseText);
      let content = ``;

      for (let user of users) {
        content += `<tr>
                            <td>${user.name}</td>
                            <td>${user.birthYear}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>`;
      }

      document.getElementById("content").innerHTML = content;
    }
  };

  xhttp.open(
    "GET",
    "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users",
    true
  );

  xhttp.send();
}

function loadDocJQuery() {
  $.ajax({
    url: "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users",
    method: "GET",
  }).done(function (users) {
    let content = ``;

    for (let user of users) {
      content += `<tr>
                            <td>${user.name}</td>
                            <td>${user.birthday}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td><button type="button" class="btn btn-primary" style="margin-right:5px"><a href="edit.html?${user.id}" id="editUser" style="color: white">edit</a></button><button id="deleteUser"  type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onclick="deleteUser(${user.id})" style="margin-right:5px">delete</button><input onclick="showdiv()" type="checkbox" class="btn-check" id="btn-check ${user.id}" autocomplete="off"></td>
                        </tr>`;
    }
    $("#content").html(content);
  });
}

//   loadDoc();
loadDocJQuery();

//delete one user

var saveDeleteUser;

function deleteUser(deleteUser) {
  saveDeleteUser = deleteUser;
  if (check % 2 == 0) {
    $.ajax({
      url:
        "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/" +
        deleteUser,
      type: "DELETE",
    });
    loadDocJQuery();
  }
}

var check = 1;

function checkDelete() {
  check++;
  deleteUser(saveDeleteUser);
  check = 1;
}

//delete multiple users

$("#target").hide();
function showdiv() {
  $("#target").show();
  if ($("input:checkbox:checked").length == 0) $("#target").hide();
}
var checkedBox = [];
function deleteMultiples() {
  // var checkboxes = $('input:checkbox:checked').length;
  // alert(checkboxes);

  $("input:checkbox").each(function () {
    var $this = $(this);
    var str = $this.attr("id");
    var ret = str.split(" ");
    var str1 = ret[1];
    if ($this.is(":checked")) {
      checkedBox.push(str1);
    }
  });
  console.log(checkedBox);
}

function deleteMultipleUsers() {
  for (i = 0; i < checkedBox.length; i++) {
    $.ajax({
      url:
        "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/" +
        checkedBox[i],
      type: "DELETE",
    });
  }
  loadDocJQuery();
}


//js create page
function createUser() {
  $.post("https://quan-ly-sinh-vien-techmaster.herokuapp.com/users", {
    name: $("#name").val(),
    birthYear: $("#birthYear").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
  })

    .done(function () {
      alert("them moi user thanh cong!");
      location.href = "index.html";
    })

    .fail(function (err) {
      console.log(err);
      alert("khong ket noi duoc server");
    });
}

//js edit

 var url = window.location.href;
 var sortedUrl = url.substring("32", url.length);
 function loadUser() {
   $.ajax({
     url:
       "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/" + sortedUrl,
     method: "GET",
   }).done(function (users) {
     $("#name").val(users.name);
     $("#birthYear").val(users.birthday);
     $("#email").val(users.email);
     $("#phone").val(users.phone);
   });
 }
 loadUser();

 function updateUser() {
   let data = {
     name: $("#name").val(),
     birthday: $("#birthYear").val(),
     email: $("#email").val(),
     phone: $("#phone").val(),
   };
   $.ajax({
     url:
       "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/" + sortedUrl,
     type: "PUT",
     data: data,
     success: function (data) {
       alert("Cập nhật thành công");
     },
   });
 }