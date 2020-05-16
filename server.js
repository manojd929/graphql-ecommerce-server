const { GraphQLServer } = require('graphql-yoga')
const db = require('./database')

const typeDefs = `
    type Query  {
        getProductsList: [Product]!,
        getProductDetails(id: String): Product!,
        getBrandsList: [Brand]!,
        getBrandDetails(id: String): Brand!
    }

    type Product {
        name: String!,
        description: String,
        availability: Int!,
        brandId: String!,
        price: Price
    }

    type Price {
        currency: String!,
        value: Int!
    }

    type Brand {
        name: String!
    }
`

const resolvers = {
    Query: {
        getProductsList: () => db.products.list(),
        getProductDetails: (root, { id }, context) => db.products.get(id),
        getBrandsList: () => db.brands.list(),
        getBrandDetails: (root, { id }, context) => db.brands.get(id)
    }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server listening at 4000'))