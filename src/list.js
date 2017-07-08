import dragula from 'dragula';

import retrieveTemplate from './retrieveTemplate';

export default function createList(listEl, pubSub) {
  init();

  function init() {
    const drake = dragula([listEl]);

    drake.on('drop', () => pubSub.publish('listUpdated', getItems()))
    drake.on('drag', el => el.classList.add('active'));
    drake.on('dragend', el => el.classList.remove('active'));

    pubSub.subscribe('listImported', render);
  }

  function render(items) {
    listEl.innerHTML = '';

    items.forEach(item => {
      listEl.appendChild(createListItem(item));
    });

    pubSub.publish('listUpdated', items)
  }

  function getItems() {
    return Array.from(listEl.getElementsByTagName('li'))
      .map(liEl => ({
        name: liEl.querySelector('.js-name').textContent,
        amount: Number(liEl.querySelector('.js-badge').textContent)
      }));
  }

  function createListItem(item) {
    const liEl = retrieveTemplate('#listItemTemplate', 'li');

    liEl.querySelector('.js-badge').textContent = item.amount || 1;
    liEl.querySelector('.js-name').textContent = item.name;

    return liEl;
  }
}
