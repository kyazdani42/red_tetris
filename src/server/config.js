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
        app: {
            host: '',
        },
        api : {
            host: '',
        },
    },
  mongo: {
    uriPrefix: 'mongodb://',
    host: 'localhost',
    port: 27017,
    database: 'redTetris',
    poolSize: 50,
  },
};
