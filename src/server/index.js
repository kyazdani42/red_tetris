const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');

const mongoClient = require('./client/mongodb');
// const socketClient = require('./client/socket.io');

const corsConfig = require('./middlewares/cors');

// require('./models');

const routes = require('./routes');
const app = express();

// Configure application
// disable express powered by header (user dont need to know that the api is powered by ExpressJs)
app.disable('x-powered-by');
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(bodyParser.json({ limit: '15mb' }));

// Router config
app.use(corsConfig);
app.use('/', routes);

// unhandled error logging
process.on('unhandledRejection', (error) => {
    console.log(error); // eslint-disable-line no-console
});

// Server configuration
const server = http.createServer(app);

const listen = function () {
    const port = app.get('port');
    if (!process.env.TEST) {
        const httpServer = server.listen(port, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server started');
            }
        });
        process.on('SIGINT', () => {
            httpServer.close();
            process.exit();
        });
    }
};

async function initServer() {
    await mongoClient.initClient();
    // await socketClient.initClient();
}

async function startServer() {
    await initServer();
    listen();
}

startServer();