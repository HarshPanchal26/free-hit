import React, { useState, useEffect } from 'react'
import Header from './components/header'
import Card from './components/card'
import Footer from './components/footer'
import products from './DB/product.json'
import BackToTopButton from './components/BackToTop'

function App() {
  const [category, setCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // const [suggestion , setSuggestions] = useState([])

  let suggestionList = {
    serchByProductName: [],
    serchByDiscription: [],
    serchByCategory: [],
  }

  function filterProduct(value) {
    setCategory(value)
    filteredButtonSelected(value)
  }

  async function filteredButtonSelected(value) {
    const button = document.querySelectorAll('.category-select')
    // Remove the "background-button-selected" class everytime the button is clicked at start to clear old selection
    button.forEach((i) => {
      i.classList.remove('background-button-selected')
    })
    let cnt = -1
    // Add the "background-button-selected" class to individual the button when it is clicked
    button.forEach((i) => {
      let selected = ''
      selected = i.getAttribute('productcategory')
      cnt++
      if (value === selected) {
        button[cnt].classList.add('background-button-selected')
        return
      }
    })
  }

  useEffect(() => {
    setCategory('all')
  }, [])

  const searchProduct = async (searchTerm, product, regex) => {
    // console.log("In" , searchTerm , product)
    await new Promise((reslove, reject) => {
      if (product.description.match(regex)) {
        suggestionList.serchByDiscription.push(product.productName)
        reslove()
      }
    })
    await new Promise((reslove, reject) => {
      if (
        suggestionList.serchByDiscription.length == 0 &&
        product.category.match(regex)
      ) {
        suggestionList.serchByCategory.push(product.productName)
        reslove()
      }
    })
  }

  const filteredProducts = products
    .filter((product) => {
      if (!searchTerm) return true
      const regex = new RegExp(searchTerm.trim(), 'gi')
      if (product.productName.match(regex)) {
        suggestionList.serchByProductName.push(product.productName)
      }
      if (suggestionList.serchByProductName.length == 0) {
        searchProduct(searchTerm.trim(), product, regex)
      }
      return (
        product.productName.match(regex) ||
        product.description.match(regex) ||
        product.category.match(regex)
      )
    })
    .sort((a, b) => {
      const nameA = a.productName.toUpperCase()
      const nameB = b.productName.toUpperCase()
      return nameA < nameB ? -1 : 1
    })

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestion={suggestionList}
      />
      <Card
        filterProduct={filterProduct}
        filteredProducts={filteredProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        length={filteredProducts.length}
      />
      <Footer />
      <BackToTopButton />
    </>
  )
}

export default App

// if(product.productName.match(regex)){
//   suggestionList.serchByProductName.push(product.productName)
// }
// if(suggestionList.serchByProductName.length === 0  &&  product.description.match(regex)){
//   console.log("Length1", suggestionList.serchByProductName.length )

//   suggestionList.serchByDiscription.push(product.productName)
// }
// if(suggestionList.serchByProductName.length === 0 && suggestionList.serchByDiscription.length === 0
//    &&  product.category.match(regex) ){
//     console.log("Length3", suggestionList.serchByProductName.length)
//     suggestionList.serchByCategory.push(product.productName)
//    }
