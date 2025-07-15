window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDate");
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    due: dueDate,
    done: false
  };

  saveTaskToStorage(task);
  displayTask(task);
  taskInput.value = "";
  dueDateInput.value = "";
}

function displayTask(task) {
  const li = document.createElement("li");
  if (task.done) li.classList.add("done");

  const span = document.createElement("span");
  span.innerText = task.text;
  span.onclick = () => {
    li.classList.toggle("done");
    updateStorage();
  };

  const dateSpan = document.createElement("div");
  dateSpan.className = "due-date";
  dateSpan.innerText = task.due ? "📅 Due: " + task.due : "";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  const textContainer = document.createElement("div");
  textContainer.appendChild(span);
  textContainer.appendChild(dateSpan);

  li.appendChild(textContainer);
  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const listItems = document.querySelectorAll("#taskList li");
  let tasks = [];

  listItems.forEach(item => {
    const text = item.querySelector("span").innerText;
    const done = item.classList.contains("done");
    const due = item.querySelector(".due-date").innerText.replace("📅 Due: ", "");
    tasks.push({ text, done, due });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => displayTask(task));
}

function clearTasks() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
}
