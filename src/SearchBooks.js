import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

    state = {
        query: '',
        booksSt: [],
        hasError: false
    }

    updateQuery = (query) => {
        this.setState({ query: query })
       // console.log(this.state.books)
    }


    render(){

        const { onChangeToShelf } = this.props
        const { query, booksSt, hasError } = this.state

        //console.log(booksSt)

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            BooksAPI.search(query).then((books)=> 
                    this.setState({ booksSt: books, hasError: false  }),
                    showingBooks = booksSt.filter((book) => match.test(book.title))
            ).catch((err) => { 
                //console.log("no results!")
                this.setState({ booksSt: [], hasError: true })

                return false
            })


        } else {
            showingBooks = []
        }

        return(
            <div>
                <div className="search-books-bar">
                <Link 
                    to='/'
                    className='close-search'
                >Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    {/* <input type="text" placeholder="Search by title or author"/> */}

                    <input
                            className='search-books'
                            type='text'
                            placeholder='Search a book'
                            value={query}
                            onChange={(event)=>this.updateQuery(event.target.value)}
                        />
            
                </div>
                </div>
                {hasError && (  
                    <div className="nothing-found">Bummer! Nothing here. Please, try again.</div>
                 )}
                <div className="search-books-results">
                    
                        {/* <ListBooks books={showingBooks} onChangeToShelf={this.changeToShelf} shelfStatus="wantToRead"/> */}

                     <ol className="books-grid">

                    {showingBooks.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== 'undefined' ? book.imageLinks.thumbnail : '' })` }}></div>
                                <div className="book-shelf-changer">
                                    {/* {console.log(book)} */}
                                    <select value="none" onChange={(event)=> onChangeToShelf(book, event.target.value)}>  
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors ? book.authors.map((author)=>( author )) : '' }</div>
                            </div>
                        </li>
                    ))}

                    </ol>

                </div>
            </div>

        )
    }
}

export default SearchBooks