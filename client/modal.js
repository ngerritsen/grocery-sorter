import retrieveTemplate from './retrieveTemplate';

export default function createModal(modalEl) {
  function open() {
    for (const closeEl of getCloseEls()) {
      closeEl.addEventListener('click', close);
    }

    modalEl.classList.add('show');
    modalEl.style.setProperty('display', 'block');

    const modalBackdropEl = retrieveTemplate('#modalBackdropTemplate', '#modalBackdrop');

    document.body.appendChild(modalBackdropEl);
  }

  function close() {
    for (const closeEl of getCloseEls()) {
      closeEl.removeEventListener('click', close);
    }

    modalEl.classList.remove('show');
    modalEl.style.removeProperty('display');
    document.getElementById('modalBackdrop').remove();
  }

  function getCloseEls() {
    return modalEl.querySelectorAll('[data-close-modal]');
  }

  return { open };
}
