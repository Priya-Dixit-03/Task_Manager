var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function () {
  modal.classList.add("active");
};
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  var i;
  for (i = 0; i < allInput.length; i++) {
    allInput[i].value = " ";
  }
});

var userData = [];
var nameElement = document.getElementById("name");
var task_nameElement = document.getElementById("task_name");
var dateElement = document.getElementById("date");
var statusElement = document.getElementById("status");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");

registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registerForm.reset(" ");
};

if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData);
}

function registrationData() {
  userData.push({
    name: nameElement.value,
    task_name: task_nameElement.value,
    date: dateElement.value,
    status: statusElement.value,
  });
  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Task created successfully!", "success");
}

var tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
  tableData.innerHTML = " ";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
        <tr index='${index}'>
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.task_name}</td>
            <td>${data.date}</td>
            <td>${data.status}</td>
            
            <td>
            
            <button class="text-info ps-3 pe-3 edit-btn" data-mdb-target="#myModal" data-mdb-toggle="modal"><i class="bi bi-pencil-square"></i></button>
        
            <button  class="text-danger ps-3 pe-3 del-btn"><i class="bi bi-trash3-fill"></i></button>
            
            </td>
        </tr>
        `;
  });

  // delete api
  var i;
  var allDelBtn = document.querySelectorAll(".del-btn");

  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("OMG! Your task has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your task is safe!");
        }
      });
    };
  }

  // update api
  var allEditBtn = document.querySelectorAll(".edit-btn");
  for (i = 0; i < allEditBtn.length; i++) {
    allEditBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("TD");
      var index = tr.getAttribute("index");
      var id = td[0].innerHTML;
      var name = td[1].innerHTML;
      var task_name = td[2].innerHTML;
      var date = td[3].innerHTML;
      var status = td[4].innerHTML;
      addBtn.onclick();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      nameElement.value = name;
      task_nameElement.value = task_name;
      dateElement.value = date;
      statusElement.value = status;
      updateBtn.onclick = function (e) {
        // e.preventDefault();
        userData[index] = {
          name: nameElement.value,
          task_name: task_nameElement.value,
          date: dateElement.value,
          status: statusElement.value,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        location.reload(
          swal("Good job!", "Task updated successfully!", "success")
        );
      };
    };
  }
};

getDataFromLocal();

// search api
var searchElement = document.querySelector("#search");
searchElement.oninput = function () {
  searchFunction();
};

function searchFunction() {
  var tr = tableData.querySelectorAll("TR");
  var filter = searchElement.value.toLowerCase();
  var i;
  for (i = 0; i < tr.length; i++) {
    var id = tr[i].getElementsByTagName("TD")[0].innerHTML;
    var name = tr[i].getElementsByTagName("TD")[1].innerHTML;
    var task_name = tr[i].getElementsByTagName("TD")[2].innerHTML;
    var date = tr[i].getElementsByTagName("TD")[3].innerHTML;
    var status = tr[i].getElementsByTagName("TD")[4].innerHTML;
    if (id.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = " ";
    } else if (name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = " ";
    } else if (task_name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = " ";
    } else if (date.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = " ";
    } else if (status.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = " ";
    } else {
      tr[i].style.display = "none";
    }
  }
}
