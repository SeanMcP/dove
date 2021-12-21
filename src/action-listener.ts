type Callback = (action: Action) => void;
type Listener = {
  list: Callback[];
  add: (callback: Callback) => void;
  remove: (callback: Callback) => void;
};

function initializeActionListener() {
  const listener: Listener = {
    list: [],
    add(callback) {
      this.list.push(callback);
    },
    remove(callback) {
      this.list = this.list.filter((cb) => cb !== callback);
    },
  };

  window.addEventListener("click", ({ target }) => {
    if (
      target instanceof HTMLElement &&
      target?.dataset?.dove &&
      target?.dataset?.type
    ) {
      listener.list.forEach((callback) =>
        callback({
          // @ts-ignore - Checking that type is defined above
          type: target.dataset.type,
          payload: target.dataset.payload,
        })
      );
    }
  });

  return listener;
}
