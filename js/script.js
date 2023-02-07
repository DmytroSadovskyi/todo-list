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

if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
  tasksArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  tasksArr.forEach(task => renderTask(task));
}

// функція для рендеру тасків на сторінці

function renderTask(task) {
  const newTask = `<li class="todo-list__item" id= "${task.id}"><span>${task.text}</span>
  <button class= "done-btn" data-action="done"><i class="fa-solid fa-check"></i></button><button class="delete-btn"
   data-action="delete"><i class="fa-solid fa-trash-can"></i></button></li>`;
  listOfTasks.insertAdjacentHTML('beforeend', newTask);
}

// функція додавання нових тасків
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === '') {
    alert('Please write your task');
    return;
  }
  const task = {
    id: Date.now(),
    text: taskInput.value,
    checked: false,
  };

  tasksArr.push(task);
  renderTask(task);

  taskInput.value = '';
  taskInput.focus();

  saveToLocalStorage();
}

// функція для зберігання нових тасків у локальному сховищі
function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksArr));
}

// функція видалення тасків
function deleteTask(event) {
  if (!event.target.classList.contains('fa-trash-can')) return;
  const parent = event.target.closest('.todo-list__item');
  parent.remove();

  const id = Number(parent.id);

  const index = tasksArr.findIndex(task => task.id === id);
  tasksArr.splice(index, 1);
  saveToLocalStorage();
}

function doneTask(event) {
  if (!event.target.classList.contains('fa-check')) return;
  const parent = event.target.closest('.todo-list__item');
  const taskSpan = parent.querySelector('span');
  taskSpan.classList.toggle('task-done');
  parent.classList.toggle('todo-list__item--semi-transparent');
}

form.addEventListener('submit', addTask);
listOfTasks.addEventListener('click', deleteTask);
listOfTasks.addEventListener('click', doneTask);
