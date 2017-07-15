import jsonRequest from './functions/jsonRequest';

export default function createGroceryService(pubSub) {
  pubSub.subscribe('groceryMoved', ({ grocery, section }) => {
    if (section === null) {
      jsonRequest('DELETE', `/groceries/${grocery}`);
      return;
    }

    jsonRequest('POST', `/groceries/${grocery}`, { section });
  });
}
