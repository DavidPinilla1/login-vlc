const express = require('express');
const app = express();
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;

const usersRouter = require('./routes/users.js')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    next();
});
app.use(morgan('dev'))
app.use(express.json());
app.use('/users', usersRouter)

app.listen(PORT, () => console.log('server running on port ' + PORT))