const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = month[today.getMonth()];
var yyyy = today.getFullYear();
let dateValue = `${dd} ${mm} ${yyyy}`;

let addBtn = document.getElementById("add_note");
let title = document.getElementById("title");
let description = document.getElementById("description");
let notesElem = document.querySelector(".notes");

let isUpdate = false;
let updateID;

addBtn.addEventListener("click", (e) => {
  if (title.value == "") {
    return alert("Please add title");
  }
  let notes = localStorage.getItem("notes");
  let backup = localStorage.getItem("backup");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (backup == null) {
    backupObj = [];
  } else {
    backupObj = JSON.parse(backup);
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = month[today.getMonth()];
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  let myObj = {
    title: title.value,
    description: description.value,
    date: `${dd} ${mm} ${yyyy} ${hours}:${minutes}`,
  };
  if (!isUpdate) {
    notesObj.push(myObj);
    backupObj.push(myObj);
  } else {
    notesObj[updateID] = myObj;
    backupObj[updateID] = myObj;
  }

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("backup", JSON.stringify(backupObj));

  title.value = "";
  description.value = "";

  showNotes();
});

//backup functionality
const backUp = document.querySelector("#back-up");
backUp.addEventListener("click", (e) => {
  notesElem = document.querySelector(".notes");
  notesElem.innerHTML = "";
  let html = "";
  let backup = localStorage.getItem("backup");
  let notes = localStorage.getItem("notes");
  if (backup == null) {
    backupObj = [];
  } else {
    backupObj = JSON.parse(backup);
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj = backupObj;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
});

//fucntion showNotes()

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
    <div class="card">
        <h3 class="note-title">${element.title}</h3>
        <input type="checkbox" id="${index}" name="chekbox" class="checkbox">
        <p class="para-description">${element.description}</p>
        <div class="modify-buttons">
        <button id="${index}" class="del" onclick="deleteNote(this.id)" >Delete</button>
        <button id="${index}" class="edit" onclick="editNote(${index})" >Edit</button>
        </div>
        <p>${element.date}</p>
      </div>
    `;
  });
  let notesElem = document.querySelector(".notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `<h3>No notes are there add please</h3>`;
  }
}
//function to delete note
function deleteNote(index) {
  let confirmDel = confirm("Are you want to delete this note?");
  let notes = localStorage.getItem("notes");
  if (confirmDel == true) {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

//function to edit note
function editNote(index) {
  let addBtn = document.querySelector("#add_note");
  addBtn.innerHTML = "Update note";
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let backup = localStorage.getItem("backup");
  if (backup == null) {
    backupObj = [];
  } else {
    backupObj = JSON.parse(backup);
  }
  title.value = notesObj[index].title;
  description.value = notesObj[index].description;
  isUpdate = true;
  updateID = index;

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("backup", JSON.stringify(backupObj));
  showNotes();
}
// delete multiple notes functionality

const delButton = document.querySelector("#delete");
delButton.addEventListener("click", () => {
  let nodeList = document.querySelectorAll("#notes .card .checkbox:checked");
  console.log(nodeList);
  let ids = [];
  nodeList.forEach((item) => {
    ids.push(item.id);
  });
  console.log(ids);
  deleteMultipleNotes(ids);
});

function deleteMultipleNotes(ids) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  ids.forEach((id, index) => {
    let a = id - index;
    notesObj.splice(a, 1);
  });

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//search functionality
const searchInputBox = document.querySelector("#search");
let notes = localStorage.getItem("notes");
if (notes == null) {
  notesObj = [];
} else {
  notesObj = JSON.parse(notes);
}
searchInputBox.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  notesElem.innerHTML = "";
  let html = "";
  notesObj.forEach((element, index) => {
    // console.log(element.title);
    if (element.title.indexOf(searchString) > -1) {
      // console.log(element);
      html += `
      <div class="card">
          <h3 class="note-title">${element.title}</h3>
          <input type="checkbox" id="${index}" name="chekbox" class="checkbox">
          <p class="para-description">${element.description}</p>
          <div class="modify-buttons">
          <button id="${index}" class="del" onclick="deleteNote(this.id)" >Delete</button>
          <button id="${index}" class="edit" onclick="editNote(${index})" >Edit</button>
          </div>
          <p>${element.date}</p>
        </div>
      `;
      notesElem.innerHTML = html;
    }
  });
});

showNotes();
