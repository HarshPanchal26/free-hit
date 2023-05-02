import React from 'react'
import freehitlogo from '../images/freehitLogo.png'
import { useEffect } from 'react'

const Header = ({ searchTerm, setSearchTerm, suggestion }) => {
  let arrayForSuggestion = []

  const sortSuggestedData = (data) => {
    console.log('Retrive data', data)
    const regex = new RegExp(
      `^${searchTerm}|[^${searchTerm}]${searchTerm}|${searchTerm}[^\\s]*`,
      'gi'
    )
    arrayForSuggestion = data
      .filter((word) => {
        console.log(word, word.match(regex))
        return word.match(regex)
      })
      .sort((a, b) => {
        const aIndex = a.indexOf(searchTerm)
        const bIndex = b.indexOf(searchTerm)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
  }
  console.log('suggestionList', arrayForSuggestion, suggestion)

  useEffect(() => {
    if (suggestion.serchByDiscription.length !== 0) {
      sortSuggestedData(suggestion.serchByDiscription)
    } else if (suggestion.serchByProductName.length !== 0) {
      sortSuggestedData(suggestion.serchByProductName)
    } else {
      sortSuggestedData(suggestion.serchByCategory)
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
