import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TriviaMain from './containers/TriviaMain/TriviaMain';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import SelectedCategory from './components/SelectedCategory/SelectedCategory';
import CompletedCategory from './components/UI/CompletedCategory/CompletedCategory';
import IncompleteCategory from './components/UI/IncompleteCategory/IncompleteCategory';
import Auth from './containers/Auth/Auth';

import './App.css';
import Timer from './components/UI/Timer/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/selected-category" search="id" component={SelectedCategory} />
            <Route path="/completed" component={CompletedCategory} />
            <Route path="/gameover" component={IncompleteCategory} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={TriviaMain} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
