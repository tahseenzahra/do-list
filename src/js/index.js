import '../style.css';
import dragDropIcon from '../images/drag-drop-icon.svg';
import deleteIcon from '../images/delete-icon.svg';
import toDoTask from './todolist.js';
import updateListItem from './taskStatusManager.js';

function getTaskList(task) {
  const toDoTaskItem = document.createElement('li');
  let focusedItem = false;
  toDoTaskItem.classList.add('todo-list-item');
  {
    const toDoTaskStatus = document.createElement('input');
    toDoTaskStatus.type = 'checkbox';
    toDoTaskStatus.checked = task.completed;
    toDoTaskStatus.addEventListener('change', () => {
      if (!toDoTaskStatus.checked) toDoTaskStatus.nextSibling.style.textDecoration = 'none';
      else toDoTaskStatus.nextSibling.style.textDecoration = 'line-through';
      updateListItem(toDoTaskStatus.checked, task.index);
    });
    toDoTaskStatus.classList.add('task-status');
    toDoTaskItem.appendChild(toDoTaskStatus);
  }
  {
    const toDoTaskDescription = document.createElement('textarea');
    toDoTaskDescription.value = task.description;
    toDoTaskDescription.classList.add('task-description');

    if (toDoTaskItem.firstChild.checked) toDoTaskDescription.style.textDecoration = 'line-through';

    toDoTaskDescription.addEventListener('keyup', (event) => {
      toDoTask.updateDescription(event.target.value, task.index);
    });

    toDoTaskDescription.addEventListener('focus', (event) => {
      focusedItem = true;
      event.target.nextSibling.src = deleteIcon;
      event.target.nextSibling.alt = 'delete';
      event.target.nextSibling.className = 'delete-icon';
      event.target.style.backgroundColor = '#fffeca';
      event.target.parentElement.style.backgroundColor = '#fffeca';
    });

    toDoTaskDescription.addEventListener('blur', (event) => {
      focusedItem = false;
      event.target.nextSibling.src = dragDropIcon;
      event.target.nextSibling.alt = 'drag drop';
      event.target.nextSibling.className = 'task-drag-icon';
      event.target.style.backgroundColor = '';
      event.target.parentElement.style.backgroundColor = '';
    });

    toDoTaskItem.appendChild(toDoTaskDescription);
  }
  {
    const toDoTaskplaceicon = document.createElement('img');
    toDoTaskplaceicon.src = dragDropIcon;
    toDoTaskplaceicon.alt = 'drag drop';
    toDoTaskplaceicon.className = 'drop-drag-icon';
    toDoTaskplaceicon.addEventListener('mousedown', () => {
      if (focusedItem) {
        toDoTaskItem.remove();
        toDoTask.remove(task.index);
      }
    });
    toDoTaskItem.appendChild(toDoTaskplaceicon);
  }
  return toDoTaskItem;
}

function updateTaskListToHTML() {
  toDoTask.taskList.forEach((task) => document.getElementById('todo-list').appendChild(getTaskList(task)));
}
function addTask(description) {
  if (description) { document.getElementById('todo-list').appendChild(getTaskList(toDoTask.add(description))); }
}

const addTaskElement = document.getElementById('list-add');
addTaskElement.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask(event.target.value);
    event.target.value = '';
  }
});

document.querySelector('#list-add-container > img').addEventListener('click', (event) => {
  event.preventDefault();
  addTask(addTaskElement.value);
  addTaskElement.value = '';
});
updateTaskListToHTML();
