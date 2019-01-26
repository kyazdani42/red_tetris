// const Joi = require('joi');
const uniqid = require('uniqid');

// const { createRoomDatabase } = require('../../services');
const { newRoom } = require('../../services/rooms');

// const SCHEMA = Joi.object().keys({
//   player: Joi.object().keys({
//     name: Joi.string().required(),
//     id: Joi.string().required(),
//   })
// });
//
// function validate(params) {
//   const result = Joi.validate(params, SCHEMA);
//   if (result.error) {
//     return {error: result.error};
//   }
//   return {
//     name: params.player.name,
//     id: params.player.id,
//   };
// }

const createRoom = async (req, res) => {
  // const { error, name, id } = validate(req.body);
  // if ( error ) res.status(500).json({error});
  // const name = uniqid();
  const newRoomName = '123';
  newRoom(newRoomName);
  // const result = await createRoomDatabase({id, name });
  res.json({ newRoomName });
};

module.exports = createRoom;