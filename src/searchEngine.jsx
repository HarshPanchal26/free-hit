import products from './DB/product.json'
const createSuggestionList = (ListOfSuggestion, searchTerm) => {
  console.log('Final Data is :', ListOfSuggestion)
  let finalList = []
  let dataBasedOnProductName = []
  let dataBaseOnDiscription = []

  //  Collection data basec on ProductName
  dataBasedOnProductName = ListOfSuggestion.serchByProductName.filter(
    (word) => {
      return word.toLowerCase().startsWith(searchTerm.toLowerCase())
    }
  )
  console.log('1', dataBasedOnProductName)
  if (dataBasedOnProductName.length <= 2) {
    dataBasedOnProductName = ListOfSuggestion.serchByProductName.filter(
      (word) => {
        return word.toLowerCase().indexOf(searchTerm) !== -1
      }
    )
  }

  // Collection of data from discription

  if (dataBasedOnProductName.length <= 2) {
    dataBaseOnDiscription = ListOfSuggestion.serchByDiscription.forEach(
      (word) => {
        products.find((product) => {
          if (product.description.indexOf(searchTerm) !== -1) {
            console.log(
              'Inside Discripition',
              product.description.indexOf(searchTerm)
            )
            return word
          }
        })
      }
    )
  }

  console.log('2', dataBaseOnDiscription)

  finalList = dataBasedOnProductName.concat(dataBaseOnDiscription)
  return finalList
}

export default createSuggestionList
