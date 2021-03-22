function createElements() {
  const elements: Record<string, Node> = {};

  document.querySelectorAll("[data-dove]").forEach((node) => {
    if (node instanceof HTMLElement && node.dataset.dove) {
      elements[node.dataset.dove] = node;
    } else {
      console.info(`Excluded from elements:`, node);
    }
  });

  return elements;
}
