import React, { Component } from 'react'
import Header from '../components/Header'
import TeamForm from '../components/TeamForm'
import TeamsList from '../components/TeamsList'

class TeamDash extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="d-flex flex-column flex-sm-row main-page">
          <TeamForm />
          <TeamsList />
        </div>
      </div>
    )
  }
}

export default TeamDash
