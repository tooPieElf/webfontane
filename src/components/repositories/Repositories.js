import PropTypes from 'prop-types';
import React from 'react';
import RepositoryItem from './RepositoryItem';
import Spinner from "../layout/Spinner";

function Repositories(props){
    const {repos,loading,setRepo} = props;
    return (
        loading ? <Spinner /> :
            <div style = {repoStyle}>
                {repos.map(repo => (
                    <RepositoryItem key={repo.id}
                                    repo={repo}
                                    setRepo = {setRepo}
                    />
                ))}
            </div>
        )
}

const repoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridGap: '0.5rem'
}
export default Repositories;

Repositories.propTypes = {
  loading: PropTypes.any,
  repos: PropTypes.any
}