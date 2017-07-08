export default function copyToClipboard(text) {
  const textarea = createTextarea(text);

  document.body.appendChild(textarea);
  textarea.select();

  const success = document.execCommand('copy');

  document.body.removeChild(textarea);

  return success;
}

function createTextarea(text) {
  const textarea = document.createElement('textarea');

  textarea.textContent = text;
  textarea.style.height = 'fixed';

  return textarea;
}
