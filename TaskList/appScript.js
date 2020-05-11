const ul = document.getElementById("taskList");
const btnAdd = document.getElementById("addNew");
const textInput = document.getElementById("textInput");
const btnClear=document.getElementById("btnClear");
const storage = window.localStorage;

const TASK_ID = "taskId";

let tasks = [];
textInput.value = "";

function addNewTask() {
  if (textInput.value != "" && /\S/.test(textInput.value)) {
    tasks.push(textInput.value);
     saveToStorage();
    hideAllTasks();
    getAllTasks();
    textInput.value = "";
  }
}

function hideAllTasks() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function getAllTasks() {
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      showTask(i, tasks[i]);
    }
    handleClicks();
  }
}

function showTask(id, text) {
  let li = document.createElement("li");
  li.id = id + TASK_ID;
  li.innerHTML = text;

  let btnCheck = createButton(id + "check", "btn-success btnCheck", "&#10003");
  let btnRemove = createButton(
    id + "remove",
    "btn-danger btnRemove",
    "&#10005"
  );

  li.appendChild(btnCheck);
  li.appendChild(btnRemove);
  ul.appendChild(li);
}

function createButton(id, cl, val) {
  let btn = document.createElement("button");
  btn.id = id;
  btn.className = cl;
  btn.innerHTML = val;
  btn.type = "button";

  return btn;
}

function handleClicks() {
  let btnsCheck = document.getElementsByClassName("btnCheck");
  for (let i = 0; i < btnsCheck.length; i++) {
    let btn = btnsCheck[i];
    btn.addEventListener("click", () => {
      let string = tasks[parseInt(btn.id)];
      if (!string.includes("<strike>")) {
        tasks[parseInt(btn.id)] = "<strike>" + string + "</strike>";
         saveToStorage();
        hideAllTasks();
        getAllTasks();
      }
    });
  }

  let btnsRemove = document.getElementsByClassName("btnRemove");
  for (let i = 0; i < btnsRemove.length; i++) {
    let btn = btnsRemove[i];
    btn.addEventListener("click", () => {
      tasks.splice(parseInt(btn.id), 1);
       saveToStorage();
      hideAllTasks();
      getAllTasks();
    });
  }
}

function saveToStorage() {
  storage.setItem("tasklistarr", tasks);
}

function getStorage() {
    let arr = storage.getItem("tasklistarr");
    tasks = arr.split(",");
}

function storageEmpty(){
    if (window.localStorage.length===0 || window.localStorage.getItem("tasklistarr")==="") return true;
    else return false;
}

window.onload = () => {
    if (!storageEmpty()){
    getStorage();
  }

  btnClear.addEventListener("click",()=>{
      storage.removeItem("tasklistarr");
      tasks=[];
      hideAllTasks();
      getAllTasks();
  })

  btnAdd.addEventListener("click",() => {
    addNewTask();
  });

  getAllTasks();

  window.onkeydown = e => {
    if (e.key == "Enter" && textInput.value != "") {
      e.preventDefault();
      addNewTask();
    } else if (e.key == "Delete") {
      e.preventDefault();
      tasks.pop();
      hideAllTasks();
      getAllTasks();
    }
  };
};
