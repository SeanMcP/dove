function initializeActionListener() {
    var listener = {
        list: [],
        add: function (callback) {
            this.list.push(callback);
        },
        remove: function (callback) {
            this.list = this.list.filter(function (cb) { return cb !== callback; });
        }
    };
    window.addEventListener("click", function (_a) {
        var _b, _c;
        var target = _a.target;
        if (target instanceof HTMLElement &&
            ((_b = target === null || target === void 0 ? void 0 : target.dataset) === null || _b === void 0 ? void 0 : _b.dove) &&
            ((_c = target === null || target === void 0 ? void 0 : target.dataset) === null || _c === void 0 ? void 0 : _c.type)) {
            listener.list.forEach(function (callback) {
                return callback({
                    // @ts-ignore - Checking that type is defined above
                    type: target.dataset.type,
                    payload: target.dataset.payload
                });
            });
        }
    });
    return listener;
}
