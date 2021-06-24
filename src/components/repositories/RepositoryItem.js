import React from 'react';
import {Link} from "react-router-dom"

function RepositoryItem (props){
const {owner,name,full_name} = props.repo;
const {setRepo}  = props;
const {avatar_url} = owner;
    return (
        <div className='card text-center'>
            <img src={avatar_url}
                 alt=''
                 className='round-img'
                 style={{width: '60px'}}/>
            <h3>{name}</h3>
            <div>
                <Link to="/analysis" onClick={()=>setRepo(full_name)} className='btn btn-sweet-blue btn-sm my-1'>
                    repository
                </Link>
            </div>
        </div>
    );

}

export default RepositoryItem;