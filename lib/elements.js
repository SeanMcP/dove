function createElements() {
    var elements = {};
    document.querySelectorAll("[data-dove]").forEach(function (node) {
        if (node instanceof HTMLElement && node.dataset.dove) {
            elements[node.dataset.dove] = node;
        }
        else {
            console.info("Excluded from elements:", node);
        }
    });
    return elements;
}
