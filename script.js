let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;
let columns = [todo, progress, done];

//for adding tasks from the local storage

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      const div = document.createElement("div");

      div.classList.add("task");
      div.setAttribute("draggable", "true");

      div.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.desc}</p>
            <button>Delete</button>
    `;

      const deleteBtn = div.querySelector("button");
      deleteBtn.addEventListener("click", () => {
        div.remove();
        updateCounter();
      });

      column.appendChild(div);
    });
  }
}

const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    dragElement = task;
  });
});

//Counter for the tasks in the column

function updateCounter() {
  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");
    count.innerText = `Count : ${tasks.length}`;

    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  });
}

updateCounter();

//Events on column 

function addDragEventOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    updateCounter();
  });
}

addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);

// modal related logic

const toggleModalbtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");
const addTaskBtn = document.querySelector(".add-task-btn");

toggleModalbtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

bg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDesc = document.querySelector("#task-desc-input").value;

  if(taskTitle.trim() ===""){
    alert("Input field cannot be empty . Please enter a value")
    return 0;
  }
  
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
            <h2>${taskTitle}</h2>
            <p>${taskDesc}</p>
            <button>Delete</button>
    `;
  
  todo.appendChild(div);

  div.addEventListener("drag", () => {
    dragElement = div;
  });

  const deleteBtn = div.querySelector("button");
  deleteBtn.addEventListener("click", () => {
    div.remove();
    updateCounter();
  });

  updateCounter();

  modal.classList.remove("active");

  document.querySelector("#task-title-input").value = "";
  document.querySelector("#task-desc-input").value = "";
});

// modal related logic
