import dragula from 'dragula';

import retrieveTemplate from '../functions/retrieveTemplate';

export default function createGroceryList(listEl, pubSub) {
  init();

  function init() {
    const drake = dragula([listEl]);

    drake.on('drop', () => pubSub.publish('listUpdated', getItems()))
    drake.on('drag', el => el.classList.add('active'));
    drake.on('dragend', el => el.classList.remove('active'));

    pubSub.subscribe('groceriesImported', render);
  }

  function render(groceryList) {
    listEl.innerHTML = '';

    groceryList.forEach((grocery) => {
      listEl.appendChild(createListItem(grocery));
    });

    pubSub.publish('listUpdated', groceryList)
  }

  function getItems() {
    return Array.from(listEl.getElementsByTagName('li'))
      .map(liEl => ({
        name: liEl.querySelector('.js-name').textContent,
        amount: Number(liEl.querySelector('.js-badge').textContent)
      }));
  }

  function createListItem(grocery) {
    const liEl = retrieveTemplate('#listItemTemplate', 'li');

    liEl.querySelector('.js-badge').textContent = grocery.amount || 1;
    liEl.querySelector('.js-name').textContent = grocery.name;

    return liEl;
  }
}
