const filterData = (data) => {
  var filtered = JSON.parse(JSON.stringify(data))
  for (let key in filtered) {
    delete filtered[key].gift
  }
  return filtered
}

module.exports = filterData