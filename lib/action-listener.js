function initializeActionListener(store) {
    window.addEventListener("pointerup", function (_a) {
        var _b, _c;
        var target = _a.target;
        if (target instanceof HTMLElement &&
            ((_b = target === null || target === void 0 ? void 0 : target.dataset) === null || _b === void 0 ? void 0 : _b.dove) &&
            ((_c = target === null || target === void 0 ? void 0 : target.dataset) === null || _c === void 0 ? void 0 : _c.type)) {
            store.dispatch({
                type: target.dataset.type,
                payload: target.dataset.payload
            });
        }
    });
}
