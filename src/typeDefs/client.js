const { gql } = require("apollo-server-express")

const typeDefs = gql`
    type Client {
        id: ID
        firstName: String
        lastName: String
        phone: String
        email: String
    }

    input ClientInput {
        firstName: String
        lastName: String
        phone: String
        email: String
    }

    type Query {
        getAllClients: [Client]
        getClient(id: ID): Client
    }

    type Mutation {
        createClient(client: ClientInput): Client
        deleteClient(id: ID): String
        updateClient(client: ClientInput): Client
    }
`

module.exports = typeDefs
