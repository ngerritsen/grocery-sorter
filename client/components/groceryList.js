import dragula from 'dragula';
import partion from 'lodash/partition';
import groupBy from 'lodash/groupBy';

import retrieveTemplate from '../functions/retrieveTemplate';

// eslint-disable-next-line max-statements
export default function createGroceryList(listEl, pubSub) {
  let drakes = [];

  init();

  function init() {
    pubSub.subscribe('groceriesImported', render);
  }

  function render(groceryList) {
    listEl.innerHTML = '';

    const [groceriesWithSection, groceries] = partion(groceryList, grocery => grocery.section);
    const sections = groupBy(groceriesWithSection, 'section');

    Object.keys(sections).forEach((section) => {
      listEl.appendChild(createSection(section, sections[section]));
    });

    insertGroceryItems(listEl, groceries);

    pubSub.publish('listUpdated', groceryList);

    initDragDrop();
  }

  function initDragDrop() {
    drakes.forEach(drake => drake.destroy());

    const sectionItemContainers = listEl.querySelectorAll('.js-section-items');
    const sectionDrake = createScopedDrake([listEl], 'js-section');
    const groceryDrake = createScopedDrake([listEl, ...sectionItemContainers], 'js-grocery');

    handleDragDropEvents(sectionDrake, groceryDrake);

    drakes = [sectionDrake, groceryDrake];
  }

  function handleDragDropEvents(sectionDrake, groceryDrake) {
    sectionDrake.on('drop', () => {
      pubSub.publish('sectionOrderUpdated', getSections());
      pubSub.publish('groceryListUpdated', getItems());
    });

    groceryDrake.on('drop', (el, target) => {
      const sectionEl = target.closest('.js-section');
      const grocery = el.querySelector('.js-name').textContent;
      const section = sectionEl ? sectionEl.querySelector('.js-section-title').textContent : null;

      pubSub.publish('groceryMoved', { grocery, section });
      pubSub.publish('groceryListUpdated', getItems());
    });

    sectionDrake.on('drop', () => {
      pubSub.publish('sectionOrderUpdated', getSections());
      pubSub.publish('groceryListUpdated', getItems());
    });

    drakes.forEach(handleActiveState);
  }

  function createScopedDrake(elements, className) {
    return dragula(elements, {
      moves: (el, container, handle) => handle.classList.contains(className)
    });
  }

  function handleActiveState(drake) {
    drake.on('drag', el => el.classList.add('active'));
    drake.on('dragend', el => el.classList.remove('active'));
  }

  function getSections() {
    return Array.from(listEl.querySelectorAll('.js-section'))
      .map(sectionEl => sectionEl.querySelector('.js-section-title').textContent);
  }

  function getItems() {
    return Array.from(listEl.querySelectorAll('.js-grocery'))
      .map(liEl => ({
        name: liEl.querySelector('.js-name').textContent,
        amount: Number(liEl.querySelector('.js-badge').textContent)
      }));
  }

  function createSection(section, groceries) {
    const sectionEl = retrieveTemplate('#sectionTemplate', 'li');
    const { color } = groceries[0];

    sectionEl.querySelector('.js-section-title').textContent = section;
    sectionEl.querySelector('.js-section-bullet').style.setProperty('color', color);

    insertGroceryItems(sectionEl.querySelector('.js-section-items'), groceries);

    return sectionEl;
  }

  function createListItem(grocery) {
    const liEl = retrieveTemplate('#listItemTemplate', 'li');

    liEl.querySelector('.js-badge').textContent = grocery.amount || 1;
    liEl.querySelector('.js-name').textContent = grocery.name;

    return liEl;
  }

  function insertGroceryItems(el, groceries) {
    groceries.forEach(grocery => el.appendChild(createListItem(grocery)));
  }
}
