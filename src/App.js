
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
        books: [],
        currentlyReading: null,
        wantToRead: null,
        readAlready: null
      }

      this.moveBooksToAnotherCategory = this.moveBooksToAnotherCategory.bind(this);
      this.getBookById = this.getBookById.bind(this);
      //this.refreshHomeWithSearchedResults = this.refreshHomeWithSearchedResults.bind(this);
  }




  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      console.log(allBooks)
      this.setState({
        books: allBooks
      })
    })
  }


  getBookById(id) {
  let books

    if(this.state.books) {
      books = this.state.books.filter((book) => book.id === id)
      if (books.length > 0) {
        return books[0]
      } else {
        return null
      }
    }
  }

  /*
  refreshHomeWithSearchedResults(){
    //alert('here')
    this.setState({
      showSearchPage: false
    })
  }
  */

  moveBooksToAnotherCategory(event, book) {
    let shelfValue = event.target.value;
    BooksAPI.update(book, event.target.value).then(() => {
      book.shelf = shelfValue;
      this.setState(state => ({
        books:state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
    //this.browserHistory.push('/');
    //this.refreshHomeWithSearchedResults();
  }

  render() {
    let currentlyReading
    let wantToRead
    let readAlready

    //let allBooks = this.state.books

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

        <Route path='/search' render={({history}) => (
          <SearchBooks

            onMoveBooksToAnotherCategory={(event, book)=>{
              this.moveBooksToAnotherCategory (event, book)
              history.push('/')
            }}
            getBookById={this.getBookById}
            /*
            onMoveBooksToAnotherCategory={()=>{
              this.moveBooksToAnotherCategory;
              history.push('/')
            }}
            */
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
                getBookById={this.getBookById}
              />
              <ListBooks
                onMoveBooksToAnotherCategory={this.moveBooksToAnotherCategory}
                books={wantToRead}
                title='Want to Read'
                getBookById={this.getBookById}
              />
              <ListBooks
                onMoveBooksToAnotherCategory={this.moveBooksToAnotherCategory}
                books={readAlready}
                title='Read'
                getBookById={this.getBookById}
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
