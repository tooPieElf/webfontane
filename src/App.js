import './App.css';
import React, { useState} from 'react';
import NavBar from "./components/layout/NavBar";
import axios from 'axios';
import Repositories from "./components/repositories/Repositories";
import Search from "./components/repositories/Search"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Analysis from "./components/Analysis/Analysis";
import Alert from "./components/layout/Alert";
import GithubState from "./context/github/GithubState";



function App() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlertt] = useState(null)
    const [repoName, setrepoName] = useState(null);


   const searchUsers = async (text) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/search/repositories?q=${text}`)
       setRepos(res.data.items)
       setLoading(false)
    }

    const clearUsers = () => {
        setRepos([]);
        setLoading(false);
    }
    const setAlert =(msg, type) =>{
        setAlertt({msg: msg, type: type})

        setTimeout(()=>setAlertt(null), 1000)
    }

    const setRepo = (svn_url) => setrepoName(svn_url);
    return (
        <GithubState>
        <Router>
        <div className = "App">
          <NavBar title="Webb Fontane"/>
            <div className="container">
                <Alert alert = {alert}/>
                <Switch>
                <Route path = '/' exact  render ={()=>
                    <>
                        <h2>Public Repository Search Application</h2>
                        <Search searchUsers={searchUsers} clearUsers = {clearUsers} setAlert={setAlert} />
                        <Repositories repos = {repos} loading = {loading} setRepo ={setRepo}/>
                    </>

                }/>
                <Route path = '/analysis' component={ ()=> <Analysis repoName = {repoName} loading = {loading} />}/>
                </Switch>


            </div>
        </div>
        </Router>
        </GithubState>
    );

}

export default App;
