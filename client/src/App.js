import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// // components
import TeamDash from './views/TeamDash';
import NotFound from './views/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={TeamDash} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
