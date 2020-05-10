const express = require("express");
const bodyPraser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { connect } = require("./db/config/dbconfig");
const resolvers = require("./graphql/resolvers/index");
const Schema = require("./graphql/schema/index");
const app = express();
app.use(bodyPraser.json());
connect();
app.use("/graphql", graphqlHttp({
    schema: Schema,
    rootValue: resolvers,
    graphiql: true
}))
app.listen(3000, console.log("server running"));