const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql

const Book = require('../models/book')
const Author = require('../models/author')

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type:  GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return Book.find({ authorId: parent._id })
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
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parent, args) {
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve () {
        return Book.find()
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve () {
        return Author.find()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve (parent, args) {
        return Author.create({ name: args.name, age: args.age })
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (parent, args) {
        return Book.create({ name: args.name, genre: args.genre, authorId: args.authorId })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
