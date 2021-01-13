import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import axios from "axios";
class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: "",
  };
  ///////// search for users
  searchUsers = async (text) => {
    this.setState(() => ({ loading: true }));
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState(() => ({ loading: false, users: res.data.items }));
  };
  //// Clear user state
  clearUsers = () => {
    this.setState(() => ({ users: [], loading: false }));
  };
  //// get an individual user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, user: res.data });
  };
  getRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, repos: res.data });
  };
  ///// set an alert
  setAlert = (alert) => {
    this.setState({ alert });
    setTimeout(() => {
      this.setState({ alert: "" });
    }, 5000);
  };
  render() {
    return (
      <BrowserRouter>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <React.Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users
                    users={this.state.users}
                    loading={this.state.loading}
                  />
                </React.Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <React.Fragment>
                  <User
                    getUser={this.getUser}
                    getRepos={this.getRepos}
                    loading={this.loading}
                    user={this.state.user}
                    repos={this.state.repos}
                    {...props}
                  />
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
