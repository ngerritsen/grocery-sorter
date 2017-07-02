import dragula from 'dragula';
import parseList from './parse';

window.addEventListener('DOMContentLoaded', main);

let list = [];

function main() {
  const importFormEl = document.getElementById('importForm');
  const exportButtonEl = document.getElementById('exportButton');
  const clipboardButtonEl = document.getElementById('clipboardButton');
  const drake = dragula([document.getElementById('list')]);

  drake.on('drop', updateList);
  drake.on('drag', el => el.classList.add('active'));
  drake.on('dragend', el => el.classList.remove('active'));

  exportButtonEl.addEventListener('click', exportList);
  clipboardButtonEl.addEventListener('click', copyExportToClipboard);
  importFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    importList();
  });
}

function importList() {
  const importInputEl = document.getElementById('importInput');

  list = parseList(importInputEl.value);

  renderList();
  updateExportButtonState();

  importInputEl.value = '';
  $('#importModal').modal('hide');
}

function renderList() {
  const listEl = document.getElementById('list');
  listEl.innerHTML = '';

  list.forEach(item => {
    listEl.appendChild(createListItem(item));
  });
};

function createListItem(item) {
  const listTemplate = document.getElementById('listItemTemplate');
  const liOriginal = listTemplate.content.querySelector('li');
  const liEl = document.importNode(liOriginal, true);
  const badgeEl = liEl.querySelector('.js-badge');
  const content = document.createTextNode(item.name);

  liEl.insertBefore(content, badgeEl);
  badgeEl.textContent = item.amount || 1;

  return liEl;
}

function updateExportButtonState() {
  const exportButtonEl = document.getElementById('exportButton');

  if (list.length > 0) {
    exportButtonEl.removeAttribute('disabled');
    return;
  }

  exportButtonEl.setAttribute('disabled', false);
}

function exportList() {
  const listExportEl = document.getElementById('listExport');

  listExportEl.textContent = list.join('\n');
}

function updateList() {
  const listEl = document.getElementById('list');
  const listItems = Array.prototype.slice.call(listEl.getElementsByTagName('li'));

  list = listItems.map(item => item.textContent);
}

function copyExportToClipboard() {
  const listExportEl = document.getElementById('listExport');
  const textarea = document.createElement('textarea');

  textarea.textContent = listExportEl.textContent;
  textarea.style.height = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();

  document.execCommand('copy');
  document.body.removeChild(textarea);
}
