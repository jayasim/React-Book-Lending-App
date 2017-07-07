import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import ImageInput from './ImageInput'
//import serializeForm from 'form-serialize'
import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class SearchBooks extends Component {

  state = {
    query: ''
  }

  componentDidMount() {
    console.log('here');
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    console.log('clearQuery')
    this.setState({ query: '' })
  }

  render() {

    const { books } = this.props
    const { query } = this.state

    let showingBooks = [];

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.name))
    } else {
      showingBooks = books
    }

    //showingBooks.sort(sortBy('name'))

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
