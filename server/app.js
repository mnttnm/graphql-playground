const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb://mohit:mohittater123@ds115874.mlab.com:15874/graphql-mnt', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use(cors());

// bind express with graphql middleware
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is listening on 4000');
});

