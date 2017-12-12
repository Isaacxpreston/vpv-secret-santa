const passwordLookup = (password, data) => {
  let pairs = []
  for (let key in data) {
    pairs.push(data[key])
  }
  let pair = pairs.filter((pair) => { return pair.password === password})
  return pair[0] ? pair[0].gift : false
}

module.exports = passwordLookup