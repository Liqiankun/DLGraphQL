import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetail from './BookDetail'
class BookList extends Component {
  state = {
    selectedBook: null
  }

  displayBooks = () => {
    const { loading, books } = this.props.data
    if (loading) {
      return (<div>Loading Books</div>)
    } else {
      return books.map(book => {
        return (
          <li key={book._id} onClick={() => {
            this.setState({ selectedBook: book._id })
          }}>{book.name}</li>
        )
      })
    }
  }
  render() {
    const { selectedBook } = this.state
    return (
      <div>
        <ul id='book-list'>
          { this.displayBooks() }
        </ul>
        <BookDetail selectedBook={selectedBook} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList)
