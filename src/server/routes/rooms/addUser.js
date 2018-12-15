const Joi = require('joi');

const { addUserInRoomDatabase, getRoomByIdDatabase } = require('../../services');

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

const addUser = async (req, res) => {
  const { error, name, id } = validate(req.body);
  if ( error ) res.status(500).json({error});

  const { roomIdError } = await addUserInRoomDatabase(req.params.roomId, {id, name });
  if ( roomIdError ) res.status(500).json({roomIdError});

  const result = await getRoomByIdDatabase(req.params.roomId, {});
  res.json(result);
};

module.exports = addUser;