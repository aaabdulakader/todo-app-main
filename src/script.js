"use strict";

let taskInput = document.querySelector(".task-input");
let addCheckbox = document.querySelector(".add-checkbox");
let checkbox = document.querySelectorAll(".checkbox");
let itemsLeft = document.querySelector(".items-left");
let taskBox = document.querySelector(".task-box");
let clearBtn = document.querySelector(".clear");
let categories = document.querySelector(".categories");
let tasks = [];
let completedTasks = [];

// let addTasks = document.querySelector(".add-tasks");
checkbox.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    item.classList.toggle("checked");
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
          class="task flex  items-center bg-dark-blue-800 p-4 transition ease-in-out duration-200"
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
          <p class="task-name text-neutral-gray-100">${task}</p>
          <img
            class="cross h-5 w-5 object-contain cross ml-auto"
            src="/images/icon-cross.svg"
            alt="cross"
          />
        </div>`,
  };
  // If empty input, don't add task, else add task to list
  task ? tasks.push(taskObj) : "";

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  displayTasks(tasks);
}

// Display task in list
function displayTasks(arr) {
  console.log("Tasks: ", arr);
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
}
// Get tasks from local storage
function getTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // let activeTasks = tasks.filter((item) => item.checked == false);
  // activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];
  displayTasks(tasks);
}
getTasks();

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTasks();
  }
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

    tasks.forEach((item) => {
      if (item.id == id) {
        item.checked = !item.checked;
      }
    });

    displayTasks(tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

// Filter by all/active/completed todos
let all = () => {
  let allTasks = tasks.filter((item) => {
    return item.checked == false || item.checked == true;
  });

  displayTasks(allTasks);

  console.log("All tasks: ", allTasks);
};

let active = () => {
  let activeTasks = tasks.filter((item) => item.checked == false);

  displayTasks(activeTasks);
  console.log("Active tasks: ", activeTasks);
};

let completed = () => {
  let completedTasks = tasks.filter((item) => item.checked == true);

  displayTasks(completedTasks);
  console.log("Completed tasks: ", completedTasks);
};

categories.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;

  // add focused to target and remove from others and display the tasks
  [...document.querySelector(".filter").children].forEach((item) => {
    target.classList.contains("clear") ||
    target.classList.contains("items-left")
      ? ""
      : item.classList.remove("focused");
  });

  target.classList.contains("clear") || target.classList.contains("items-left")
    ? ""
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
