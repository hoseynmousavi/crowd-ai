import bodyParser from "body-parser"
import express from "express"
import botRouter from "router/botRouter"

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

botRouter(server)

server.route("*")
    .get((_, res) => {
        res.status(404)
            .send({error: "Not Found"})
    })


server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})
