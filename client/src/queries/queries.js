import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
  {
    authors{
      name
      _id
    }
  }
`

const getBooksQuery = gql`
  {
    books{
      name
      _id
    }
  }
`

const getBookQuery = gql`
  query($id: String){
    book(id: $id){
      name
      genre
      author{
        name
        age
        books{
          name
          _id
        }
      }
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID !){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      _id
      genre
    }
  }
`

export {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
  getBookQuery
}
