const graphql = require('graphql')
const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList
} = graphql

const books = [
  { name: 'This is first book', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'This is second book', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'This is third book', genre: 'Fantasy', id: '3', authorId: '3' },
  { name: 'This is fourth book', genre: 'Fantasy', id: '4', authorId: '3' }
]

const authors = [
  { name: 'This is first book', age: 30, id: '1' },
  { name: 'This is second book', age: 30, id: '2' },
  { name: 'This is third book', age: 30, id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type:  GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parent, args) {
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parent, args) {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve () {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve () {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
