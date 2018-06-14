const mongoose = require('mongoose');
const PlayerSchema = require('./player');

const TeamSchema = new mongoose.Schema({
  name: String,
  players: { type: [PlayerSchema] },
});

module.exports = TeamSchema;