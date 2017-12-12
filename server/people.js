const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

let people = () => {
  let list = shuffle([
    "Isaac",
    "Jonathan",
    "Ross",
    "Thomas",
    "Aenea",
    "Alexa",
    "Anshey",
    "Caroline",
    "Darren",
    "Elsa",
    "Jenna",
    "Kathleen",
    "Lauren",
    "Ramona",
    "Stephanie"
  ])
  return list.concat(list[0])
}

module.exports = people