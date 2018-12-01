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
    }
};
