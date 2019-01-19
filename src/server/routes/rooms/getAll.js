// const Joi = require('joi');
// const _ = require('lodash');
// const { searchRoomsDatabase } = require('../../services');
const { getRooms } = require('../../client/socket.io');
const SCHEMA = Joi.object().keys({
  running: Joi.boolean(),
});

// function validate(params) {
//   const result = Joi.validate(params, SCHEMA);
//   if (result.error) {
//     return {error: result.error};
//   }
//   return {
//     running: params.running,
//   };
// }

const  getAll = async (req, res) => {
  // const { error, running } = validate(req.params);
  // if ( error ) res.status(500).json({error});
  //
  // const filter = {};
  // if (!_.isEmpty(running)) Object.assign(filter, { running });
  //
  // const result = await searchRoomsDatabase(filter);
    const rooms = await getRooms();
  res.json({ rooms });
};

module.exports = getAll;
