document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTasks();
    taskInput.value = '';
  }
}

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    
    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', editTask);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Delete task
function deleteTask(e) {
  const taskId = e.target.parentElement.getAttribute('data-id');
  const tasks = getTasks().filter(task => task.id != taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(e) {
  const taskId = e.target.parentElement.getAttribute('data-id');
  const tasks = getTasks();
  const task = tasks.find(task => task.id == taskId);
  
  taskInput.value = task.text;
  deleteTask(e); 

  addTaskButton.textContent = 'Update Task';
  addTaskButton.removeEventListener('click', addTask);
  addTaskButton.addEventListener('click', function updateTask() {
    task.text = taskInput.value.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    taskInput.value = '';
    addTaskButton.textContent = 'Add Task';
    addTaskButton.removeEventListener('click', updateTask);
    addTaskButton.addEventListener('click', addTask);
  });
}

function loadTasks() {
  renderTasks();
}
