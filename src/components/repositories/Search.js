import PropTypes from 'prop-types'
import React, {useState} from 'react';

function Search({searchUsers, clearUsers, setAlert}) {
  const [text,setText] = useState('');

     const onChange = (e) => setText( e.target.value);

     const onSubmit = (e) => {
        e.preventDefault();
        if(text===''){
             setAlert('Please enter something', 'danger')
        }else{
            searchUsers(text);
            setText('')
        }

    }


        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="enter repository name"
                        value={text}
                        onChange={onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                   <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>

            </div>
        );
    }


export default Search;

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
}
