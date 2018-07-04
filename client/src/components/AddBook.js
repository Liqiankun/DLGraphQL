import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  displayAuthors = () => {
    const { authors, loading } = this.props.getAuthorsQuery
    if (loading) {
      return (<option disabled>Loading Authors</option>)
    } else {
      return authors.map(author => {
        return (<option key={author._id} value={author._id}>{author.name}</option>)
      })
    }
  }

  onSubmit = (e) => {
    const { addBookMutation } =  this.props
    const { name, genre, authorId } = this.state
    e.preventDefault()
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={(e) => this.onSubmit(e)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name='name' onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name='genre' onChange={e => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select name='authorId' onChange={e => this.setState({ authorId: e.target.value })}>
            { this.displayAuthors() }
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery'}),
  graphql(addBookMutation, { name: 'addBookMutation'})
)(AddBook)
