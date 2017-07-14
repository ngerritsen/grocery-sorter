import createModal from './modal';
import createList from './list';
import createPubSub from './pubSub';
import createImportForm from './importForm';
import createExporter from './exporter';
import createSectionService from './sectionService';
import createExportButton from './exportButton';

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
  createList(document.getElementById('list'), pubSub);
  createImportForm(document.getElementById('importForm'), sectionService, pubSub);

  importButtonEl.addEventListener('click', importModal.open);
  exportButtonEl.addEventListener('click', exportModal.open);
}
