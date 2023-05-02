import React from 'react'
import freehitlogo from '../images/freehitLogo.png'
import { useEffect } from 'react'

const Header = ({ searchTerm, setSearchTerm, suggestion }) => {
  let arrayForSuggestion = []

  const sortSuggestedData = (data) => {
    // console.log('Retrive data', data)
    // const regex = new RegExp(
    //   `^${searchTerm}|[^${searchTerm}]${searchTerm}|${searchTerm}[^\\s]*`,
    //   'gi'
    // )

    arrayForSuggestion = data.filter((word) => {
      return word.toLowerCase().startsWith(searchTerm.toLowerCase())
    })
  }

  useEffect(() => {
    if (suggestion.serchByDiscription.length !== 0) {
      sortSuggestedData(suggestion.serchByDiscription)
      // console.log('Discription', arrayForSuggestion , suggestion)
    } else if (suggestion.serchByProductName.length !== 0) {
      sortSuggestedData(suggestion.serchByProductName)
      // console.log('ProductName', arrayForSuggestion , suggestion)
    } else {
      sortSuggestedData(suggestion.serchByCategory)
      // console.log('Ctegoery', arrayForSuggestion , suggestion)
    }
  }, [suggestion])
  return (
    <header className="title-bar" name="Top">
      <h1>
        <img className="logo" src={freehitlogo} alt="My Image" />
        FREE-HIT
      </h1>
      <ul className="hnav-links">
        <li>
          <input
            type="text"
            placeholder=" Search for a tool or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </li>
      </ul>
    </header>
  )
}

export default Header
