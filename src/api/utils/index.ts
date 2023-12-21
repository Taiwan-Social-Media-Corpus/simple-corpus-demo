function isObject(value: any) {
  return value != null && typeof value === 'object' && Array.isArray(value) === false;
}

function isEmptyObject(value: object | null) {
  if (!value) return false;
  return isObject(value) && Object.entries(value).length === 0;
}

export { isObject, isEmptyObject };
