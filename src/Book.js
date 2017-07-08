import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class Books extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bookShelf: ""
    }
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBooksToAnotherCategory: PropTypes.func.isRequired,
  }

  componentDidMount() {
      const { book, getBookById } = this.props
      let bookOnShelf = getBookById(book.id);
      let shelf;
      if(bookOnShelf !== null) {
          shelf = bookOnShelf.shelf
      } else {
          shelf = 'none'
      }
      this.setState({bookShelf: shelf})
  }

  render() {
    const { book, onMoveBooksToAnotherCategory } = this.props

    //let bookOnShelf =
    return (

            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                  <div className="book-shelf-changer">
                    <select selected value={this.state.bookShelf} onChange={(event) => onMoveBooksToAnotherCategory(event, book)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.map((author)=>author) + '' : ''}</div>
              </div>
            </li>

    )
  }
}

export default Books
