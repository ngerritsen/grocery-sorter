export default function createPubSub() {
  let subscribers = [];
  let token = 0;

  function subscribe(event, handler) {
    token += 1;
    subscribers = [...subscribers, { event, handler, token }]
  }

  function publish(event, data) {
    if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
      console.info(event, data); // eslint-disable-line no-console
    }

    subscribers
      .filter(sub => sub.event === event)
      .forEach(sub => sub.handler(data));
  }

  return { subscribe, publish };
}
