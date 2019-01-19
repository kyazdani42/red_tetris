const rooms = [];

const getRooms = () => rooms.reduce((accu, room, index) => {
    if (!room.data.running) {
        return accu.push(index);
    }
    return accu;
}, []);

module.exports = {
    getRooms,
};