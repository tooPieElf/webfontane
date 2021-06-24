import './App.css';
import React, {Component} from 'react';
import NavBar from "./components/layout/NavBar";
import axios from 'axios';
import Repositories from "./components/repositories/Repositories";
import Search from "./components/repositories/Search"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Analysis from "./components/Analysis/Analysis";
import Alert from "./components/layout/Alert";


class App extends Component {

    state = {
        repos: [],
        loading: false,
        alert: null,
        repoName: null
    }

    searchUsers = async (text) => {
        this.setState({loading: true})
        const res = await axios.get(`https://api.github.com/search/repositories?q=${text}`)
        this.setState({
            repos: res.data.items,
            loading: false
        })
    };

    clearUsers = () => this.setState({repos: [],loading: false});
    setAlert =(msg, type) =>{
        this.setState({
            alert: {
                msg: msg,
                type: type
            }
        })
        setTimeout(()=>this.setState({alert:null}), 1000)
    }

    setRepo = (svn_url) => this.setState({repoName: svn_url  })

  render() {
        const {loading, repos, repoName} = this.state
    return (
        <Router>
        <div className = "App">
          <NavBar title="Webb Fontane"/>
            <div className="container">
                <Alert alert = {this.state.alert}/>
                <Switch>
                <Route path = '/' exact  render ={()=>
                    <>
                        <Search searchUsers={this.searchUsers} clearUsers = {this.clearUsers} setAlert={this.setAlert} />
                        <Repositories repos = {repos} loading = {loading} setRepo ={this.setRepo}/>
                    </>

                }/>
                <Route path = '/analysis' component={ ()=> <Analysis repoName = {repoName} loading = {loading} />}/>
                </Switch>


            </div>
        </div>
        </Router>
    );
  }
}

export default App;
