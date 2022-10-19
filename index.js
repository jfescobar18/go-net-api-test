const compression = require("compression")
const bodyParser = require("body-parser")
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./src/typeDefs")
const resolvers = require("./src/resolvers")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) {
        return false
    }
    return compression.filter(req, res)
}

function printServerInfo() {
    const dateTime = new Date()
    const message = `Server runnning on Port:- ${process.env.PORT} Starteds at :- ${dateTime.toISOString()}`
    console.log("\x1b[32m%s\x1b[0m", message)
}

async function createServer() {
    const app = express()

    app.use(cors())
    app.options("*", cors())
    app.use(bodyParser.json())
    app.use(
        compression({
            filter: shouldCompress,
            level: 7,
        })
    )

    app.use(bodyParser.json({ limit: "5mb", extended: true }))
    app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }))
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname + "/wwwroot")))

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "wwwroot", "index.html"))
    })

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({ app })

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    app.listen(process.env.PORT, () => {
        printServerInfo()
    })
}

try {
    createServer()
} catch (error) {
    console.log("\x1b[31m%s\x1b[0m", error)
}
