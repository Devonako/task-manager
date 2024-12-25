const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = loadTasks(); 
renderTasks();

addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskClick);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <div>
        <button class="edit">Edit</button> 
        <button class="delete">Delete</button>
      </div>
    `;
    li.querySelector('.delete').addEventListener('click', () => deleteTask(index));
    li.querySelector('.edit').addEventListener('click', () => editTask(index));
    taskList.appendChild(li);
  });
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function handleTaskClick(event) {
  const target = event.target;
  const listItem = target.closest('li'); 
  if (listItem) {
    const index = Array.from(taskList.children).indexOf(listItem);
    if (target.classList.contains('delete')) {
      deleteTask(index);
    } else if (target.classList.contains('edit')) {
      editTask(index);
    } else {
      toggleTaskComplete(index);
    }
  }
}