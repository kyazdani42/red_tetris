const express = require('express');
const router = express.Router();

const roomsApi = require('./rooms');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Birds home page');
});

router.get('/rooms', (req, res) => {
    roomsApi.getAll(req, res);
});

router.post('/room', (req, res) => {
    roomsApi.createRoom(req, res);
});

router.post('/room/:roomId([0-9a-fA-F]{24})/addUser', (req, res) => {
    roomsApi.addUser(req, res);
});

module.exports = router;