"use strict";

const taskInput = document.querySelector(".task-input");
const addCheckbox = document.querySelector(".add-checkbox");
const checkbox = document.querySelectorAll(".checkbox");
const itemsLeft = document.querySelector(".items-left");
const taskBox = document.querySelector(".task-box");
const clearBtn = document.querySelector(".clear");
const categories = document.querySelector(".categories");
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

let tasks = [];
let completedTasks = [];

// let addTasks = document.querySelector(".add-tasks");
checkbox.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (item.classList.contains("add-checkbox")) {
      taskInput.value == ""
        ? taskInput.focus()
        : item.classList.toggle("checked");
    } else {
      item.classList.toggle("checked");
    }
  });
});
// random & unique id generator
function randomId() {
  return Math.floor(Date.now());
}

// Add task to list
function addTasks() {
  let task = taskInput.value;
  let id = randomId();
  // let completed =
  let taskObj = {
    task: task,
    checked: false,
    id: id,
    taskElement: `<div draggable="true" id="${id}"
          class="task flex  items-center bg-neutral-gray-200 dark:bg-dark-blue-800 p-4 transition ease-in-out duration-200 "
        >
          <div
            class="checkbox flex items-center justify-center h-5 w-5 mr-5 border border-dark-gray-700 rounded-full cursor-pointer transition ease-in-out duration-200"
          >
            <img
              class="check rounded-full"
              src="/images/icon-check.svg"
              alt="check"
            />
          </div>
          <p class="task-name ">${task}</p>
          <img
            class="cross h-4 w-4 object-contain cross ml-auto"
            src="/images/icon-cross.svg"
            alt="cross"
          />
        </div>`,
  };
  // If empty input, don't add task, else add task to list
  task ? tasks.push(taskObj) : "";

  localStorage.setItem("tasks", JSON.stringify(tasks));
  setTimeout(() => {
    addCheckbox.classList.remove("checked");
  }, 200);
  taskInput.value = "";
  displayTasks(tasks);
}

// Display task in list
function displayTasks(arr) {
  taskBox.innerHTML = "";
  let html = ``;
  arr.forEach((item) => {
    html = item.taskElement + html;
  });
  taskBox.insertAdjacentHTML("afterbegin", html);

  arr.forEach((item) => {
    if (item.checked == true) {
      document
        .getElementById(item.id)
        .querySelector(".checkbox")
        .classList.add("checked");

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  // for the items left counter, count only the tasks that are not checked
  let itemsLeft = document.querySelector(".items-left");
  let activeTasks = tasks.filter((item) => item.checked == false);

  itemsLeft.innerHTML =
    activeTasks.length > 1 && activeTasks
      ? activeTasks.length + " items left"
      : activeTasks.length + " item left";

  let addTaskBox = document.querySelector(".add-tasks");

  if (tasks.length == 0) {
    console.log("no tasks");
    addTaskBox.style.borderRadius = "0.375rem 0.375rem 0 0";
    document.querySelector(".taskEls").style.marginBottom = "";
  } else {
    document.querySelector(".taskEls").style.marginBottom = "0.5rem";
  }
}

// Get tasks from local storage
function getTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  displayTasks(tasks);
}
getTasks();

// Add task eventListeners
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTasks();
  }
});

addCheckbox.addEventListener("click", (e) => {
  e.preventDefault();
  addTasks();
});

// Clear tasks
function clearTasks() {
  tasks = tasks.filter((item) => item.checked == false);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks(tasks);
}

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearTasks();
});

// Delete task from list
taskBox.addEventListener("click", (e) => {
  e.preventDefault();

  const target = e.target;
  let id = target.parentElement.id;
  if (target.classList.contains("cross")) {
    // Remove that specific task from the list and the others remain in the list, checked or unchecked
    tasks = tasks.filter((item) => item.id != id);
    completedTasks = completedTasks.filter((item) => item.id != id);

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);
  }

  if (target.classList.contains("checkbox")) {
    target.classList.add("checked");

    //toggle the checked class and change the checked property to true or false and not uncheck the other tasks
    let checked;
    tasks.forEach((item) => {
      if (item.id == id) {
        item.checked = !item.checked;
        checked = item;
      }
    });

    tasks.unshift(tasks.splice(tasks.indexOf(checked), 1)[0]);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);
  }
});

// Filter by all/active/completed todos
let all = () => {
  let allTasks = tasks.filter((item) => {
    return item.checked == false || item.checked == true;
  });

  displayTasks(allTasks);
};

let active = () => {
  let activeTasks = tasks.filter((item) => item.checked == false);

  displayTasks(activeTasks);
};

let completed = () => {
  let completedTasks = tasks.filter((item) => item.checked == true);

  displayTasks(completedTasks);

  itemsLeft.innerHTML =
    completedTasks.length > 1
      ? completedTasks.length + " items completed"
      : completedTasks.length + " item completed";
};

categories.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;

  // add focused to target and remove from others and display the tasks
  [...document.querySelector(".filter").children].forEach((item) => {
    target.classList.contains("items-left")
      ? ""
      : item.classList.remove("focused");
  });

  target.classList.contains("clear") || target.classList.contains("items-left")
    ? document.querySelector(".all").classList.add("focused")
    : target.classList.add("focused");

  if (target.classList.contains("all")) all();
  if (target.classList.contains("active")) active();
  if (target.classList.contains("completed")) completed();
});

// Drag and drop

let draggingEle;

function handleDragStart(e) {
  draggingEle = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", draggingEle.innerHTML);
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  const targetEle = e.target.closest(".task");
  if (targetEle && targetEle !== draggingEle) {
    taskBox.insertBefore(draggingEle, targetEle.nextSibling);
  }
}

function handleDragEnd() {
  draggingEle = null;
}

taskBox.addEventListener("dragstart", handleDragStart);
taskBox.addEventListener("dragover", handleDragOver);
taskBox.addEventListener("dragend", handleDragEnd);

// Dark mode

const handleDarkMode = (e) => {
  e.preventDefault();

  let target = e.target;
  let body = document.querySelector("body");

  if (target.classList.contains("moon")) {
    target.style.display = "none";
    sun.style.display = "block";
    body.classList.add("dark");
    body.classList.remove("white-mode");
  } else {
    target.style.display = "none";
    moon.style.display = "block";
    body.classList.remove("dark");
    body.classList.add("white-mode");
  }
};

moon.addEventListener("click", handleDarkMode);
sun.addEventListener("click", handleDarkMode);
