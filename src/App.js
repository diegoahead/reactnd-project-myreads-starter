import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'

 
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>
      this.setState({ books: books })
    )
  }

  changeToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) =>{
      BooksAPI.getAll().then((books)=>
        this.setState({ books: books })
      )
    })
    console.log(this)
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <div className="search-books">
          <SearchBooks onChangeToShelf={this.changeToShelf} books={this.state.books} />
          </div>
        )} />

        <Route exact path="/" render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books} onChangeToShelf={this.changeToShelf} shelfStatus="currentlyReading" />
                  </div>
                </div>
              </div>

              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books} onChangeToShelf={this.changeToShelf} shelfStatus="wantToRead"/>
                  </div>
                </div>
              </div>

              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books} onChangeToShelf={this.changeToShelf} shelfStatus="read"/>
                  </div>
                </div>
              </div>

            </div>
            <div className="open-search">
              <Link 
                  to='/search'
                  className='add-book'
              >Add Contact</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
