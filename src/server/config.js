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
};
