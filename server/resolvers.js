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
      return Team.findOneAndUpdate({ _id: id }, { players }, {new: true})
    }
    
  }
}

module.exports = resolvers;

// updateTeam: (root, { id, players }) => {
//   Team.findOne({ _id: id }, function (err,team) { 
//     if(!err) { 
//       team.players = players;
//       team.save()
//     }
//   })
//   return Team.find({})
// }