const Joi = require('joi');

const { createRoomDatabase } = require('../../services');
const { newRoom } = require('../../client/socket.io');

const SCHEMA = Joi.object().keys({
  player: Joi.object().keys({
    name: Joi.string().required(),
    id: Joi.string().required(),
  })
});

function validate(params) {
  const result = Joi.validate(params, SCHEMA);
  if (result.error) {
    return {error: result.error};
  }
  return {
    name: params.player.name,
    id: params.player.id,
  };
}

const createRoom = async (req, res) => {
  const { error, name, id } = validate(req.body);
  if ( error ) res.status(500).json({error});

  const newRoomName = newRoom();
  const result = await createRoomDatabase({id, name });
  res.json({result, room: newRoomName});
};

module.exports = createRoom;