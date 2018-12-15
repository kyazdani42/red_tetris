const Joi = require('joi');

const { removeUserInRoomDatabase } = require('../../services');

const SCHEMA = Joi.object().keys({
    userId: Joi.string().required(),
});

function validate(params) {
  const result = Joi.validate(params, SCHEMA);
  if (result.error) {
    return {error: result.error};
  }
  return {
    userId: params.userId,
  };
}

const removeUser = async (req, res) => {
  console.log('la')
  const { error, userId } = validate(req.body);
  if ( error ) res.status(500).json({error});

  const { roomIdError, data } = await removeUserInRoomDatabase(req.params.roomId, userId);
  if ( roomIdError ) res.status(500).json({roomIdError});

  res.json(data);
};

module.exports = removeUser;