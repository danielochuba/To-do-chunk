/* eslint-disable no-self-assign */
export default class todo {
  constructor() {
    this.tasks = [];
  }

  save() {
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
  }

  addTask = (desc, completed, index) => {
    const task = {
      desc,
      completed,
      index,
    };
    this.tasks.push(task);
    this.save();
    window.location.reload();
  };

  showBG = () => {
    const inputForm = document.querySelectorAll('.item');
    inputForm.forEach((item, index) => {
      item.addEventListener('click', () => {
        const itemContent = document.querySelector(`.item${index}`);
        const trashImage = document.querySelector(`.trash-image${index}`);
        const moreImage = document.querySelector(`.humberger-image${index}`);
        const selected = document.querySelector('.selected');
        const trashImageActive = document.querySelector('.trash-image-show');
        const moreImageHide = document.querySelector('.more-image-hide');
        if (selected != null) {
          selected.classList.remove('selected');
          trashImageActive.classList.remove('trash-image-show');
          moreImageHide.classList.remove('more-image-hide');
        }
        itemContent.classList.add('selected');
        trashImage.classList.add('trash-image-show');
        moreImage.classList.add('more-image-hide');
      });
    });
  }

  fixLength = () => {
    let lenght = 0;
    this.tasks.forEach((item) => {
      item.desc = item.desc;
      item.index = lenght;
      item.completed = item.completed;
      lenght += 1;
    });
  }

  deleteItem = (index) => {
    this.tasks = this.tasks.filter((item, i) => i !== index);
    this.fixLength();
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
    window.location.reload();
  };

  updateList = (desc, index) => {
    this.tasks[index].desc = desc;
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
    window.location.reload();
  }

  reload = (reloadBtn) => {
    reloadBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  completed = (item, index, descInput) => {
    if (item.checked === true) {
      this.tasks[index].completed = true;
      localStorage.setItem('localTasks', JSON.stringify(this.tasks));
      descInput.classList.add('completed');
    } else {
      this.tasks[index].completed = false;
      localStorage.setItem('localTasks', JSON.stringify(this.tasks));
      descInput.classList.remove('completed');
    }
    window.location.reload();
  };

  completedTasks = () => {
    const checkedIndex = [];
    this.tasks.forEach((completedTask, index) => {
      if (completedTask.completed === true) {
        checkedIndex.push(index);
      }
    });
    return checkedIndex;
  }

  clearAll = (checkedIndex) => {
    const result = this.tasks.filter((elem, index) => checkedIndex.indexOf(index) === -1);
    this.tasks = result;
    this.fixLength();
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
    window.location.reload();
  }
}
