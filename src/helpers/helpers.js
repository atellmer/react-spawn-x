function isArray(target) {
  return Array.isArray(target);
}

function isFunc(target) {
  return typeof target === 'function';
}

function isString(target) {
  return typeof target === 'string';
}

function error(message) {
  throw new Error(message);
}

export {
  isArray,
  isFunc,
  isString,
  error
}
