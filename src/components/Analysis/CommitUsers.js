import React from 'react';

function CommitUsers (props){
const {uniqueUsers} = props;
console.log(uniqueUsers);
    return (
        <div className='card '>
            <ul>
                   { uniqueUsers && uniqueUsers.map(name => <li key="{name}">{name}</li>)}
            </ul>
        </div>
    );

}

export default CommitUsers;
