const Client = require("../models/Client.model")

const resolvers = {
    Query: {
        getAllClients: async () => {
            return await Client.find()
        },
        getClient: async (parent, { id }, context, info) => {
            return await Client.findById(id)
        },
    },
    Mutation: {
        createClient: async (parent, args, context, info) => {
            const { firstName, lastName, phone, email } = args.client
            const client = new Client({ firstName, lastName, phone, email })
            await client.save()

            return client
        },
        deleteClient: async (parent, { id }, context, info) => {
            await Client.findByIdAndDelete(id)
            return "Client deleted"
        },
        updateClient: async (parent, args, context, info) => {
            const { id, firstName, lastName, phone, email } = args.client
            const client = await Client.findByIdAndUpdate(
                id,
                {
                    firstName,
                    lastName,
                    phone,
                    email,
                },
                { new: true }
            )

            return client
        },
    },
}

module.exports = resolvers
