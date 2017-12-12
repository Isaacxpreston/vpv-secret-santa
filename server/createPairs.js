const randomString = (length) => {
  length = length || 12
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

const createPairs = (array, store) => {
  store = store || {}
  if (!array[1]) return store
  store[array[0]] = {
    gift: array[1],
    password: randomString()
  }
  return createPairs(array.slice(1), store)
}

module.exports = createPairs