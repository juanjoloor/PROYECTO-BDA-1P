

const express = require('express');
var cors = require('cors')
const helmet = require('helmet');
const app = express();


const { config } = require('./config/index');
const battleApi = require('./routes/battle');

const { 
    logErrors, 
    wrapErrors, 
    errorHandler
} = require('./utils/middleware/errorHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');


// body parse
app.use(express.json());
app.use(helmet());
app.use(cors())
//Routes
battleApi(app);

//NotFound, catch 404
app.use(notFoundHandler);

//Middleware de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});