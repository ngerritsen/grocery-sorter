import createPubSub from './pubSub';
import createSectionService from './sectionService';

import createModal from './components/modal';
import createGroceryList from './components/groceryList';
import createImportForm from './components/importForm';
import createExporter from './components/exporter';
import createExportButton from './components/exportButton';

const sectionService = createSectionService();
const pubSub = createPubSub();

window.addEventListener('DOMContentLoaded', main);

function main() { // eslint-disable-line max-statements
  const exportButtonEl = document.getElementById('exportButton');
  const importButtonEl = document.getElementById('importButton');

  const importModal = createModal(document.getElementById('importModal'));
  const exportModal = createModal(document.getElementById('exportModal'));

  createExportButton(exportButtonEl, pubSub);
  createExporter(document.getElementById('listExport'), pubSub);
  createGroceryList(document.getElementById('list'), pubSub);
  createImportForm(document.getElementById('importForm'), sectionService, pubSub);

  importButtonEl.addEventListener('click', importModal.open);
  exportButtonEl.addEventListener('click', exportModal.open);
}
