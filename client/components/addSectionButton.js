export default function createAddSectionButton(addSectionButtonEl, pubSub) {
  pubSub.subscribe('groceryListUpdated', (list) => {
    if (list.length > 0) {
      addSectionButtonEl.style.display = 'block';
      return;
    }

    addSectionButtonEl.style.display = 'none';
  });
}
