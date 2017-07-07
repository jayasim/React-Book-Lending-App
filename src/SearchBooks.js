import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types';
//import ImageInput from './ImageInput'
//import serializeForm from 'form-serialize'
//import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchedBooks: []
    }
  }

  static propTypes = {
    onMoveBooksToAnotherCategory: PropTypes.func.isRequired,
    onSearchBook: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log('here');
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    if(query.trim() !== '') {
      BooksAPI.search(query, 20).then(books => this.setState({
        searchedBooks: books
      }))
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  clearQuery = () => {
    console.log('clearQuery')
    this.setState({ query: '' })
  }

  render() {

    const { onMoveBooksToAnotherCategory, onSearchBook } = this.props
    const { query } = this.state

    let showingBooks = this.state.searchedBooks;

    /*
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.name))
    } else {
      showingBooks = books
    }
    */

    showingBooks.sort(sortBy('title'))

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-contacts'
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {
              showingBooks.map((book) => (
              <Book
                book={book ? book : null}
                key={book.id}
                onMoveBooksToAnotherCategory={onMoveBooksToAnotherCategory}
                onSearchBook={onSearchBook}
               />
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
