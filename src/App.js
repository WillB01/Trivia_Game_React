import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TriviaMain from './containers/TriviaMain/TriviaMain';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Categories from './containers/Categories/Categories';
import SelectedCategory from './components/SelectedCategory/SelectedCategory';

import './App.css';
import Timer from './components/UI/Timer/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/selected-category" component={SelectedCategory} />
            <Route path="/" exact component={TriviaMain} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
