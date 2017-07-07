import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
    currentlyReading: null,
    wantToRead: null,
    readAlready: null
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  searchBooks() {

  }

  moveBooksToAnotherCategory() {

  }

  render() {
    let currentlyReading
    let wantToRead
    let readAlready

    if(this.state.books !== null) {
      currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
      wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
      readAlready = this.state.books.filter((book) => book.shelf === 'read')
    }
    return (
      <div className='app'>

        <Route path='/search' render={({ history }) => (
          <SearchBooks
            onSearchBook={() => {
              this.searchBooks()
              history.push('/')
            }}
          />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <ListBooks
                onMoveBooksToAnotherCategory={this.moveBooksToAnotherCategory}
                books={currentlyReading}
                title='Currently Reading'
              />
              <ListBooks
                onMoveBooksToAnotherCategory={this.moveBooksToAnotherCategory}
                books={wantToRead}
                title='Want to Read'
              />
              <ListBooks
                onMoveBooksToAnotherCategory={this.moveBooksToAnotherCategory}
                books={readAlready}
                title='Read'
              />
            </div>
          <div className="open-search">
            <Link
              to='/search'
            >Add a book</Link>
          </div>
        </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
