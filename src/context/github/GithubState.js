import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_REPOS
}from '../types'

const GithubState = props =>{
    const initialState ={
        repos: [],
        loading: false,
        alert: null,
        repoName: null
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search Users

    //Get User

    //Get Repos

    //Clear Users

    //Set loading

    return <GithubContext.Provider
    value={{
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        repoName: state.repoName


    }}
    >
        {props.children}

    </GithubContext.Provider>
}
export default GithubState
