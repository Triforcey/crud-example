var ajv = new require('ajv')();

function sanitizePotato(potato) {
  if (typeof potato.size == 'string') potato.size = parseInt(potato.size);
  return potato;
}

exports.createPotato = function (potato) {
  potato = sanitizePotato(potato);
  var valid = ajv.validate({
    type: 'object',
    additionalProperties: false,
    properties: {
      name: {
        type: 'string'
      },
      size: {
        type: 'integer'
      }
    },
    required: [
      'name',
      'size'
    ]
  }, potato);
  return valid ? potato : false;
};

exports.updatePotato = function (potato) {
  potato = sanitizePotato(potato);
  var valid = ajv.validate({
    type: 'object',
    additionalProperties: false,
    minProperties: 2,
    properties: {
      _id: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      size: {
        type: 'integer'
      }
    },
    required: [
      '_id'
    ]
  }, potato);
  return valid ? potato : false;
};

exports.deletePotato = function (potato) {
  potato = sanitizePotato(potato);
  var valid = ajv.validate({
    type: 'object',
    additionalProperties: false,
    properties: {
      _id: {
        type: 'string'
      }
    },
    required: [
      '_id'
    ]
  }, potato);
  return valid ? potato : false;
};
