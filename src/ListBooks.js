import React, { Component } from 'react'


class ListBooks extends Component {

    state = {
        value: this.props.shelfStatus
    }

    render() {
        return(
            <ol className="books-grid">
            {this.props.books.map((book) => (
                this.props.shelfStatus === book.shelf &&(
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            {/* {console.log(book)} */}
                            <select value={this.state.value} onChange={(event)=> this.props.onChangeToShelf(book, event.target.value)}>  
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors.map((author)=>( author ))}</div>
                    </div>
                </li>
                )
            ))}</ol>
        )
    }
}

export default ListBooks