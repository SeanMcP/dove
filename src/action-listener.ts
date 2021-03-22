function initializeActionListener(store: Store<unknown>) {
  window.addEventListener("pointerup", ({ target }) => {
    if (
      target instanceof HTMLElement &&
      target?.dataset?.dove &&
      target?.dataset?.type
    ) {
      store.dispatch({
        type: target.dataset.type,
        payload: target.dataset.payload,
      });
    }
  });
}
