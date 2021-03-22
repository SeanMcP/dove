type Action = {
  type: string;
  payload?: any;
};
type Reducer<T> = (state: T, action: Action) => T;
type Store<T> = {
  dispatch: (action: Action) => void;
  state: T;
  subscriptions: [SubscriptionCallback<T>, WatchList<T>][];
  subscribe: (
    callback: SubscriptionCallback<T>,
    watchList?: WatchList<T>
  ) => void;
  unsubscribe: (callback: SubscriptionCallback<T>) => void;
};
type SubscriptionCallback<T> = (state: T) => void;
type WatchList<T> = (keyof T)[];

function createStore<T>(initialState: T, reducer: Reducer<T>) {
  const store: Store<T> = {
    dispatch(action: Action) {
      const prevState = store.state;
      const nextState = reducer(prevState, action);

      if (JSON.stringify(prevState) === JSON.stringify(nextState)) return;
      this.state = nextState;

      this.subscriptions.forEach(([cb, watchList]) => {
        if (
          watchList.length === 0 ||
          watchList.some((key) => prevState[key] !== nextState[key])
        ) {
          cb(store.state);
        }
      });
    },
    state: { ...initialState },
    subscriptions: [],
    subscribe(callback, watchList = []) {
      this.subscriptions.push([callback, watchList]);
    },
    unsubscribe(callback) {
      this.subscriptions = this.subscriptions.filter(([cb]) => cb !== callback);
    },
  };

  return store;
}
