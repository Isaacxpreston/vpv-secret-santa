const passwordLookup = (password, data) => {
  let pairs = []
  for (let key in data) {
    pairs.push({
      name: key,
      password: data[key].password,
      gift: data[key].gift
    })
  }
  let pair = pairs.filter((pair) => { return pair.password === password})
  return pair[0] ? pair[0] : false
}

module.exports = passwordLookup