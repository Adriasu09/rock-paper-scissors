export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsAll(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function byId(id) {
  return document.getElementById(id);
}
