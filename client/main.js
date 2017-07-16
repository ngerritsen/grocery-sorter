import createPubSub from './pubSub';
import createSectionService from './sectionService';
import createGroceryService from './groceryService';

import createAddSectionForm from './components/addSectionForm';
import createModal from './components/modal';
import createGroceryList from './components/groceryList';
import createImportForm from './components/importForm';
import createExporter from './components/exporter';
import createExportButton from './components/exportButton';
import createAddSectionButton from './components/addSectionButton';

const pubSub = createPubSub();
const sectionService = createSectionService(pubSub);
createGroceryService(pubSub);

window.addEventListener('DOMContentLoaded', main);

function main() { // eslint-disable-line max-statements
  const exportButtonEl = document.getElementById('exportButton');
  const importButtonEl = document.getElementById('importButton');
  const addSectionButtonEl = document.getElementById('addSectionButton');

  const importModal = createModal(document.getElementById('importModal'));
  const exportModal = createModal(document.getElementById('exportModal'));
  const addSectionModal = createModal(document.getElementById('addSectionModal'));

  createExportButton(exportButtonEl, pubSub);
  createAddSectionButton(addSectionButtonEl, pubSub);
  createExporter(document.getElementById('listExport'), pubSub);
  createGroceryList(document.getElementById('list'), pubSub);
  createImportForm(document.getElementById('importForm'), sectionService, pubSub);
  createAddSectionForm(document.getElementById('addSectionForm'), pubSub);

  importButtonEl.addEventListener('click', importModal.open);
  exportButtonEl.addEventListener('click', exportModal.open);
  addSectionButtonEl.addEventListener('click', addSectionModal.open);
  pubSub.subscribe('sectionAdded', addSectionModal.close);
}
