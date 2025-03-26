export const storageService = {
  query,
};

function query(entityType, delay = 800) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}
