export default function createPubSub() {
  let subscribers = [];
  let token = 0;

  function subscribe(event, handler) {
    token = token += 1;
    subscribers = [...subscribers, { event, handler, token }]
  }

  function publish(event, data) {
    subscribers
      .filter(sub => sub.event === event)
      .forEach(sub => sub.handler(data));
  }

  return { subscribe, publish };
}
