const { Room } =require('../../models');

const getAvailable = () => {
  const result = Room.find({ available: true }).lean();
  return result;
};

module.exports = getAvailable;