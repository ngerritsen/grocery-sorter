/* eslint-disable no-alert */

export default function createAddSectionForm(addSectionForm, pubSub) {
  addSectionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addSection(e);
  });

  function addSection(e) {
    const nameEl = addSectionForm.querySelector('#name');
    const colorEl = addSectionForm.querySelector('#color');

    const name = nameEl.value.trim();
    const color = colorEl.value.trim();
    const formError = validateForm(name, color, e);

    if (formError) {
      alert(formError);
      e.stopPropagation();
      return;
    }

    clearForm(nameEl, colorEl);

    pubSub.publish('sectionAdded', { name, color });
  }

  function clearForm(...els) {
    els.forEach((el) => {
      el.value = '';
    });
  }

  function validateForm(name, color, e) {
    if (name.length < 2) {
      return 'Please fill in a name longer then 2 characters.';
    }

    if (!color.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return 'Color must be a valid hex color without the "#".';
    }

    return false;
  }
}
