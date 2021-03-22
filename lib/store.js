var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createStore(initialState, reducer) {
    var store = {
        dispatch: function (action) {
            var prevState = store.state;
            var nextState = reducer(prevState, action);
            if (JSON.stringify(prevState) === JSON.stringify(nextState))
                return;
            this.state = nextState;
            this.subscriptions.forEach(function (_a) {
                var cb = _a[0], watchList = _a[1];
                if (watchList.length === 0 ||
                    watchList.some(function (key) { return prevState[key] !== nextState[key]; })) {
                    cb(store.state);
                }
            });
        },
        state: __assign({}, initialState),
        subscriptions: [],
        subscribe: function (callback, watchList) {
            if (watchList === void 0) { watchList = []; }
            this.subscriptions.push([callback, watchList]);
        },
        unsubscribe: function (callback) {
            this.subscriptions = this.subscriptions.filter(function (_a) {
                var cb = _a[0];
                return cb !== callback;
            });
        }
    };
    return store;
}
