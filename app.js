const express = require("express");
const bodyPraser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { connect } = require("./db/config/dbconfig");
const resolvers = require("./graphql/resolvers/index");
const Schema = require("./graphql/schema/index");
const isAuthenticate = require('./middleware/middleware');
const app = express();
app.use(bodyPraser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(isAuthenticate);
connect();
app.use("/graphql", graphqlHttp({
    schema: Schema,
    rootValue: resolvers,
    graphiql: true
}))
app.listen(8000, console.log("server running"));