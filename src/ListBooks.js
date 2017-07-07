import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBooksToAnotherCategory: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }


  render() {
    const { books, onMoveBooksToAnotherCategory, title } = this.props
    books.sort(sortBy('title'))

    return (


            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{title}...</h2>
                <div className="bookshelf-books">


                  <ol className="books-grid">

                    {
                      books.map((book) => (
                        <li>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                              <div className="book-shelf-changer">
                                <select>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors ? book.authors[0] : ''}</div>
                          </div>
                        </li>
                      ))
                    }



                  </ol>

                </div>
              </div>
            </div>



    )
  }
}

export default ListBooks
