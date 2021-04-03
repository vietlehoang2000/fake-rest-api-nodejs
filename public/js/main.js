//js index page

// function loadDoc() {
//   var xhttp = new XMLHttpRequest();

//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const users = JSON.parse(this.responseText);
//       let content = ``;

//       for (let user of users) {
//         content += `<tr>
//                             <td>${user.name}</td>
//                             <td>${user.birthYear}</td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                         </tr>`;
//       }

//       document.getElementById("content").innerHTML = content;
//     }
//   };

//   xhttp.open("GET", "http://localhost:3000/users", true);

//   xhttp.send();
// }
var totalUser = "";

let headerToken = {
  Authorization: "Bearer " + localStorage.getItem("fakeApiToken"),
};

function loadUserName() {
  $("#dropdownMenu2").html(`Xin chào ` + localStorage.getItem("username"));
}
loadUserName();

$("#logout").click(function () {
  localStorage.clear();
  window.location.href = "login.html";
});

$("#editAcc").click(function () {
  console.log("edit.html" + localStorage.getItem("id"));
  window.location.href = "edit.html?" + localStorage.getItem("id");
});

function checkPage() {
  $.ajax({
    url: "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users",
    method: "GET",
    headers: headerToken,
    success: (users) => {
      totalUser = users.length;
      $("input").on("input", function () {
        var value = $("#choosePageNumb").val();
        if (value !== "" && value.indexOf(".") === -1) {
          $("#choosePageNumb").val(
            Math.max(Math.min(value, Math.ceil(users.length / 5)), 1)
          );
        }
      });
      let pageContent = ``;
      for (i = 1; i <= Math.ceil(users.length / 5); i++) {
        if (i <= 5) {
          if (i == 1) {
            pageContent += `<li class="page-item"><a class="page-link ${i}"  onclick="changePage(${i})" style="background-color:rgba(0, 0, 0, 0.05)">${i}</a></li>`;
          }
          if (i != 1)
            pageContent += `<li class="page-item"><a class="page-link ${i}"  onclick="changePage(${i})">${i}</a></li>`;
        }
        if (i > 5) {
          pageContent += `<li class="page-item"  ><a class="page-link ${i}"  onclick="changePage(${i})" style="display:none;">${i}</a></li>`;
        }
      }
      if (Math.ceil(users.length / 5) > 5)
        pageContent += `<li class="page-item"><a class="page-link" data-toggle="modal" data-target="#exampleModal3">...</a></li>`;
      $("#pageNumber").html(pageContent);
    },
    error: function () {
      window.location.href = "login.html";
    },
  });
}

checkPage();

function loadDocJQuery(page) {
  console.log(headerToken);
  $.ajax({
    url: `https://quan-ly-sinh-vien-techmaster.herokuapp.com/users?_page=${page}&_limit=5&_sort=id&_order=desc`,
    method: "GET",
    headers: headerToken,
    success: function (users) {
      let content = ``;
      $(`a.page-link`).css("background-color", "white");
      $(`a.page-link.${page}`).css("background-color", "rgba(0, 0, 0, 0.05)");
      for (let user of users) {
        content += `<tr>
                            <td><input onclick="showdiv()" type="checkbox" class="btn-check" id="btn-check ${user.id}" autocomplete="off">  </td>
                            <td> ${user.name}</td>
                            <td>${user.birthYear}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td style="display:flex;justify-content:space-between"><button style="margin-right:5px; border:unset; background-color:unset;"><a href="edit.html?${user.id}" id="editUser" style="color: #01A4B6"><i class="far fa-edit"></i> chỉnh sửa</a></button> <div class="style1" style="border: 1px solid #8c8b8b;width:1px"></div> <button id="deleteUser"  data-toggle="modal" data-target="#exampleModal" onclick="deleteUser(${user.id})" style="margin-right:5px; border:unset; background-color:unset;color:red;"><i class="fas fa-trash-alt" style="margin-right:3px"></i>  Xóa</button></td>
                        </tr>`;
      }
      $("#content").html(content);
    },
    error: function () {
      window.location.href = "login.html";
    },
  });
}

//   loadDoc();
loadDocJQuery(1);

// choose specific page
function choosePage() {
  if ($("#choosePageNumb").val() <= Math.ceil(totalUser / 5))
    loadDocJQuery($("#choosePageNumb").val());
}

// change specific Page
var currentPage = "1";
function changePage(pageNumb) {
  for (i = 0; i <= Math.ceil(totalUser / 5); i++) {
    $(`.page-link.${i}`).css({
      display: "none",
      transition: "all 0.1s ease-in-out",
    });
  }

  for (i = pageNumb - 2; i <= pageNumb + 2; i++) {
    $(`.page-link.${i}`).css({
      display: "block",
      transition: "all 0.1s ease-in-out",
    });
  }

  currentPage = pageNumb;
  loadDocJQuery(currentPage);
}

//next page
function nextPage() {
  if (currentPage < Math.ceil(totalUser / 5)) {
    currentPage++;

    for (i = 0; i <= Math.ceil(totalUser / 5); i++) {
      $(`.page-link.${i}`).css({
        display: "none",
        transition: "all 0.1s ease-in-out",
      });
    }

    for (i = currentPage - 2; i <= currentPage + 2; i++) {
      $(`.page-link.${i}`).css({
        display: "block",
        transition: "all 0.1s ease-in-out",
      });
    }
  }
  loadDocJQuery(currentPage);
}

//prev page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    for (i = 0; i <= Math.ceil(totalUser / 5); i++) {
      $(`.page-link.${i}`).css({
        display: "none",
        transition: "all 0.1s ease-in-out",
      });
    }

    for (i = currentPage - 2; i <= currentPage + 2; i++) {
      $(`.page-link.${i}`).css({
        display: "block",
        transition: "all 0.1s ease-in-out",
      });
    }
  }
  loadDocJQuery(currentPage);
}

//search user

function search() {
  let searchValue = $("#searchForm").val();
  if (searchValue != "") {
    $.ajax({
      url: `https://quan-ly-sinh-vien-techmaster.herokuapp.com/users?q=${searchValue}`,
      method: "GET",
      headers: headerToken,
      success: (users) => {
        let content = ``;
        for (let user of users) {
          content += `<tr>
                            <td><input onclick="showdiv()" type="checkbox" class="btn-check" id="btn-check ${user.id}" autocomplete="off">  </td>
                            <td> ${user.name}</td>
                            <td>${user.birthYear}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td style="display:flex;justify-content:space-between"><button style="margin-right:5px; border:unset; background-color:unset;"><a href="edit.html?${user.id}" id="editUser" style="color: #01A4B6"><i class="far fa-edit"></i> chỉnh sửa</a></button> <div class="style1" style="border: 1px solid #8c8b8b;width:1px"></div> <button id="deleteUser"  data-toggle="modal" data-target="#exampleModal" onclick="deleteUser(${user.id})" style="margin-right:5px; border:unset; background-color:unset;color:red;"><i class="fas fa-trash-alt" style="margin-right:3px"></i>  Xóa</button></td>
                        </tr>`;
        }
        $("#content").html(content);
      },
    });
  }
}

//delete one user

var saveDeleteUser;

function deleteUser(deleteUser) {
  saveDeleteUser = deleteUser;
  if (check % 2 == 0) {
    $.ajax({
      url:
        "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/" +
        deleteUser,
      method: "DELETE",
      headers: headerToken,
      success: () => {
        loadDocJQuery(1);
      },
      error: () => {
        alert(`sai`);
      },
    });
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
      headers: headerToken,
      success: () => {
        loadDocJQuery(1);
        $("#target").hide();
        $(".check-all").prop(`checked`, false);
      },
    });
  }
}

//check all
$(".check-all").click(function () {
  console.log($(".check-all").is(":checked"));
  if ($(".check-all").is(":checked")) {
    $("td input:checkbox").prop(`checked`, true);
    $("#target").show();
  } else {
    $("td input:checkbox:checked").prop(`checked`, false);
    $("#target").hide();
  }
});

//js create page
function createUser() {
  $.ajax({
    type: "POST",
    url: "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/",
    headers: headerToken,
    data: {
      name: $("#name").val(),
      birthYear: $("#birthYear").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
    },
  });
}

//return index
function returnIndex() {
  location.href = "index.html";
}

//reset Create
function resetCreate() {
  $("#name").val("");
  $("#birthYear").val("");
  $("#email").val("");
  $("#phone").val("");
}

//js edit

var url = window.location.href;
var sortedUrl = url.substring("61", url.length);
// var sortedUrl = url.substring("32", url.length);
function loadUser() {
  $.ajax({
    url:
      "https://quan-ly-sinh-vien-techmaster.herokuapp.com/users/" + sortedUrl,
    method: "GET",
    headers: headerToken,
    success: (users) => {
      $("#name").val(users.name);
      $("#birthYear").val(users.birthday);
      $("#email").val(users.email);
      $("#phone").val(users.phone);
    },
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
    headers: headerToken,
    success: function (data) {},
  });
}
