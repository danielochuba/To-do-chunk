import Todo from './todo';

// Display list
const display = () => {
  const task = new Todo();
  const localTasks = JSON.parse(localStorage.getItem('localTasks'));
  const items = document.querySelector('.items');

  if (localTasks != null) {
    localTasks.forEach((localtask) => {
      const tt = {
        desc: localtask.desc,
        completed: localtask.completed,
        index: localtask.index,
      };
      task.tasks.push(tt);
      if (localtask.completed === true) {
        items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox checkbox${localtask.index}' checked></div><input type='text' id='desc${localtask.index}' class='desc completed desc${localtask.index}' value='${localtask.desc}'></div>
      <div class='humberger'><img class='humberger-image humberger-image${localtask.index}' src='assets/images/more.png' alt='humberger'> <img class='trash-image trash-image${localtask.index}' src='assets/images/trash.png' alt='trash'></div>
      </form>`;
      } else {
        items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox checkbox${localtask.index}'></div><input type='text' id='desc${localtask.index}' class='desc desc${localtask.index}' value='${localtask.desc}'></div>
      <div class='humberger'><img class='humberger-image humberger-image${localtask.index}' src='assets/images/more.png' alt='humberger'> <img class='trash-image trash-image${localtask.index}' src='assets/images/trash.png' alt='trash'></div>
      </form>`;
      }
    });
  }

  const submitButton = document.querySelector('.add-input');
  submitButton.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      task.addTask(submitButton.value, false, task.tasks.length);
    }
  });

  // Show onclick background
  task.showBG();

  // Delete
  const trashBtn = document.querySelectorAll('.trash-image');
  trashBtn.forEach((trashBtn, index) => {
    trashBtn.addEventListener('click', () => {
      task.deleteItem(index);
    });
  });

  // Edit
  const descInput = document.querySelectorAll('.desc');
  descInput.forEach((desc, index) => {
    desc.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        task.updateList(desc.value, index);
      }
    });
  });

  // reload
  const reloadBtn = document.querySelector('.reload-image');
  task.reload(reloadBtn);

  // Completed
  const check = document.querySelectorAll('.checkbox');
  check.forEach((item, index) => {
    const descInput = document.querySelector(`.desc${index}`);
    item.addEventListener('change', () => {
      task.completed(item, index, descInput);
    });
  });

  // Clear All
  const btnClear = document.querySelector('.btn-clear');
  const checkedIndex = task.completedTasks();
  btnClear.addEventListener('click', () => {
    task.clearAll(checkedIndex);
  });
};

export default display;