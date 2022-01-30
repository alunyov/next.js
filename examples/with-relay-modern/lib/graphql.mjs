import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

const DateTimeType = new GraphQLScalarType({
  name: 'DateTime',
  serialize: (value) => value,
})

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  fields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(DateTimeType) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(DateTimeType) },
  },
})

const BlogPostConnectionEdgeType = new GraphQLObjectType({
  name: 'BlogPostConnectionEdge',
  fields: {
    node: {
      type: BlogPostType,
    },
  },
})

const BlogPostConnectionPageInfoType = new GraphQLObjectType({
  name: 'BlogPostConnectionPageInfo',
  fields: {
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString },
    hasNextPage: { type: GraphQLBoolean },
    hasPrevPage: { type: GraphQLBoolean },
  },
})

const BlogPostConnectionType = new GraphQLObjectType({
  name: 'BlogPostConnection',
  fields: {
    edges: {
      type: new GraphQLList(BlogPostConnectionEdgeType),
    },
    pageInfo: {
      type: BlogPostConnectionPageInfoType,
    },
  },
})

const OrderEnum = new GraphQLEnumType({
  name: 'Order',
  values: {
    asc: { value: 'asc' },
    desc: { value: 'desc' },
  },
})

const OrderByInput = new GraphQLInputObjectType({
  name: 'OrderBy',
  fields: {
    createdAt: {
      type: OrderEnum,
    },
  },
})

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    allBlogPosts: {
      args: {
        first: {
          type: GraphQLInt,
        },
        orderBy: {
          type: OrderByInput,
        },
      },
      type: BlogPostConnectionType,
    },
  },
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: { type: ViewerType },
  },
})

export const schema = new GraphQLSchema({
  query: QueryType,
})

// Example resolver for all blog posts
function allBlogPosts() {
  return {
    edges: [
      {
        cursor: 'c-1',
        node: {
          id: 1,
          content: 'This is Relay',
          title: 'Next.js Relay Example',
          createdAt: Date.now(),
        },
      },
    ],
    pageInfo: {
      startCursor: 'c-1',
      endCursor: 'c-1',
      hasNextPage: false,
      hasPrevPage: false,
    },
  }
}

// The rootValue provides a resolver function for each API endpoint
export const rootValue = {
  viewer: () => {
    return {
      allBlogPosts,
    }
  },
}
