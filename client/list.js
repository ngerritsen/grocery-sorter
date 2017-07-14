import dragula from 'dragula';

import retrieveTemplate from './retrieveTemplate';

export default function createList(listEl, pubSub) {
  init();

  function init() {
    const drake = dragula([listEl]);

    drake.on('drop', () => pubSub.publish('listUpdated', getItems()))
    drake.on('drag', el => el.classList.add('active'));
    drake.on('dragend', el => el.classList.remove('active'));

    pubSub.subscribe('groceriesImported', render);
  }

  function render(groupedList) {
    listEl.innerHTML = '';

    groupedList.unresolvedGroceries.forEach((grocery) => {
      listEl.appendChild(createListItem(grocery));
    });

    pubSub.publish('listUpdated', groupedList)
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
