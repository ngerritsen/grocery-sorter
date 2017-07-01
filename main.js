window.addEventListener('DOMContentLoaded', main);

function main() {
  const submitEl = document.querySelector('.js-submit');
  const inputEl = document.querySelector('.js-input');
  const listEl = document.querySelector('.js-list');
  const listTemplate = document.querySelector('.js-list-template');

  submitEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const items = inputEl.value.split('\n').filter(x => x.trim() !== '');
    renderList(items);
  })

  function renderList(items) {
    listEl.innerHTML = '';
    items.forEach(i => {
      const liOriginal = listTemplate.content.querySelector('li');
      const li = document.importNode(liOriginal, true);
      li.textContent = i;
      listEl.appendChild(li);
    });
  };
}
