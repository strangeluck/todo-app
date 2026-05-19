const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

const THEME_KEY = 'app-theme';

function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(THEME_KEY, 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, 'light');
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

function createTodoItem(text) {
  const item = document.createElement('li');
  item.className = 'todo-item';

  const todoControl = document.createElement('div');
  todoControl.className = 'todo-control';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.id = `todo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  checkbox.setAttribute('aria-label', 'Mark todo complete');

  const label = document.createElement('label');
  label.className = 'todo-text';
  label.htmlFor = checkbox.id;
  label.textContent = text;

  checkbox.addEventListener('change', () => {
    item.classList.toggle('completed', checkbox.checked);
    if (checkbox.checked) {
      item.style.animation = 'none';
      setTimeout(() => {
        item.style.animation = '';
      }, 10);
    }
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    item.style.animation = 'slideIn 0.3s ease-out reverse';
    item.addEventListener('animationend', () => {
      item.remove();
      renderEmptyState();
    }, { once: true });
  });

  todoControl.append(checkbox, label);
  item.append(todoControl, deleteButton);
  return item;
}

function renderEmptyState() {
  if (list.children.length === 0) {
    list.innerHTML = '<li class="todo-item empty-state">No tasks yet. Create one above! 🚀</li>';
  } else if (list.children.length === 1 && list.firstElementChild.classList.contains('empty-state')) {
    list.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    return;
  }

  const todoItem = createTodoItem(text);
  if (list.firstElementChild && list.firstElementChild.classList.contains('empty-state')) {
    list.innerHTML = '';
  }
  list.appendChild(todoItem);
  input.value = '';
  input.focus();
});

renderEmptyState();
initializeTheme();
