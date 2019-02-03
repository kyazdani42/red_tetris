module.exports = {
    cors: {
        allowedHttpMethod: [
            'GET',
            'POST',
            'OPTIONS',
            'PATCH',
            'DELETE',
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Client',
        ],
    },
    endpoints: {
        app: 'http://localhost:3001',
        api: 'http://localhost:3000',
    },
  mongo: {
    uriPrefix: 'mongodb://',
    host: 'localhost',
    port: 27017,
    database: 'redTetris',
    poolSize: 50,
  },
};
