//  Пошук елементів в DOM
const form = document.querySelector('.form');
const taskInput = document.querySelector('.form__input');
const listOfTasks = document.querySelector('.todo-list');

// Запис ключа до локального сховища у КОНСТАНТУ для
//  уникнення антипатерна
const LOCAL_STORAGE_KEY = 'tasks';

// Створення порожнього масива для додавання майбутніх даних
//  про таски у вигляді об'єктів
let tasksArr = [];

// функція для рендеру тасків на сторінці
function renderTask() {
  const newTask = document.createElement('li');
  newTask.classList.add('todo-list__item');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = task.text;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.dataset.action = 'delete';
  newTask.append(taskSpan, deleteBtn);
  listOfTasks.append(newTask);
}

// функція додавання нових тасків
function addTask(e) {
  e.preventDefault();
  const task = {
    id: Date.now(),
    text: taskInput.value,
    checked: false,
  };

  tasksArr.push(task);
  renderTask();
  taskInput.value = '';
  taskInput.focus();
}

function deleteTask(event) {
  console.log(event.target);

  if (event.target.dataset.action === 'delete') {
    const parent = event.target.closest('.todo-list__item');
    parent.remove();
  }
}

form.addEventListener('submit', addTask);
listOfTasks.addEventListener('click', deleteTask);
