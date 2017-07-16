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
    pubSub.subscribe('sectionAdded', addSection);
  }

  function render({ groceries, sections }) {
    listEl.innerHTML = '';

    Object.keys(sections).forEach((section) => {
      listEl.appendChild(createSection(sections[section]));
    });

    insertGroceryItems(listEl, groceries);

    pubSub.publish('groceryListUpdated', getItems());

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
    groceryDrake.on('drop', (el, target) => {
      const sectionEl = target.closest('.js-section');
      const grocery = el.querySelector('.js-name').textContent;
      const section = sectionEl ? sectionEl.querySelector('.js-section-title').textContent : null;

      pubSub.publish('groceryMoved', { grocery, section });
      pubSub.publish('groceryListUpdated', getItems());
    });

    sectionDrake.on('drop', () => {
      pubSub.publish('sectionsReordered', getSections());
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

  function getItems(el = listEl) {
    return Array.from(el.querySelectorAll('.js-grocery'))
      .map(liEl => ({
        name: liEl.querySelector('.js-name').textContent,
        amount: Number(liEl.querySelector('.js-badge').textContent)
      }));
  }

  function createSection(section) {
    const sectionEl = retrieveTemplate('#sectionTemplate', 'li');
    const itemsEl = sectionEl.querySelector('.js-section-items');

    sectionEl.querySelector('.js-section-title').textContent = section.name;
    sectionEl.querySelector('.js-section-bullet').style.backgroundColor = section.color;

    sectionEl.querySelector('.js-section-delete').addEventListener('click', () => {
      insertGroceryItems(listEl, getItems(itemsEl));
      sectionEl.parentNode.removeChild(sectionEl);
      pubSub.publish('sectionDeleted', section.name);
    });

    insertGroceryItems(itemsEl, section.groceries);

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

  function addSection({ name, color }) {
    const sectionEl = createSection({ name, color, groceries: [] });
    const sections = Array.from(listEl.querySelectorAll('.js-section'));

    if (sections.length === 0) {
      listEl.insertBefore(sectionEl, listEl.firstChild);
    }

    insertAfter(sectionEl, sections[sections.length - 1]);
  }

  function insertAfter(newElement, targetElement) {
    const parent = targetElement.parentNode;

    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
      return;
    }

    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
