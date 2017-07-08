import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
//import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBooksToAnotherCategory: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }


  render() {
    const { books, onMoveBooksToAnotherCategory, title, getBookById } = this.props
    books.sort(sortBy('title'))

    return (


            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{title}...</h2>
                <div className="bookshelf-books">


                  <ol className="books-grid">

                    {
                      books.map((book) => (
                        <Book
                          book={book ? book : null}
                          key={book.id}
                          onMoveBooksToAnotherCategory={onMoveBooksToAnotherCategory}
                          getBookById={getBookById}
                         />
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
