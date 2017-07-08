export default function retrieveTemplate(templateSelector, elementSelector) {
  const template = document.querySelector(templateSelector);
  const originalEl = template.content.querySelector(elementSelector);

  return document.importNode(originalEl, true);
}
