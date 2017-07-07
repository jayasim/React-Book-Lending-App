import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        currentlyReading: null,
        wantToRead: null,
        readAlready: null
      }

      this.moveBooksToAnotherCategory = this.moveBooksToAnotherCategory.bind(this);
      this.refreshHomeWithSearchedResults = this.refreshHomeWithSearchedResults.bind(this);
  }




  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      //console.log(allBooks)
      this.setState({
        books: allBooks
      })
    })
  }

  refreshHomeWithSearchedResults(){
    //alert('here')
    this.setState({
      showSearchPage: false
    })
  }

  moveBooksToAnotherCategory(event, book) {
    BooksAPI.update(book, event.target.value).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
    //this.browserHistory.push('/');
    this.refreshHomeWithSearchedResults();
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

    //let shelfTypes = this.state.shelfs;

    //let booksArray = [...currentlyReading,...wantToRead,...readAlready];
    //let booksArray = {currentlyReading, wantToRead, readAlready};

    //let allBooksInShelf = this.state.books;
    //console.log(allBooksInShelf.length);

    return (
      <div className='app'>

        <Route path='/search' render={() => (
          <SearchBooks
            onSearchBook={this.refreshHomeWithSearchedResults}
            onMoveBooksToAnotherCategory={this.moveBooksToAnotherCategory}
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
