const mongoose = require('mongoose');
const TeamSchema = require('./models/team');
const Team = mongoose.model('team', TeamSchema);

const resolvers = {

  Query: { 

    team: (root, { id }) => {
      return Team.findOne({ id })
    },

    teams: () => Team.find({})

  },

  Mutation: {

    addTeam: (root, { name, players }) => {
      const team = new Team({ name, players })
      return team.save();
    },

    deleteTeam: (root, { id }) => {
      Team.findOneAndRemove({_id : id}, function (err,team){
        return Team.find({})
      });
    },

    updateTeam: (root, { id, players }) => {
      Team.update({ _id: id }, { players })
      .then( () => {
        return Team.find({})
      })
    }
    
  }
}

module.exports = resolvers;