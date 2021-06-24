import PropTypes from 'prop-types'
import React, {Component} from 'react';

class Search extends Component {
    state = {
        text: ''
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
            this.props.searchUsers(this.state.text);
            this.setState({text: ''})
    }

    render() {
        const{clearUsers} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search users ..."
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                   <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>

            </div>
        );
    }
}

export default Search;

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
}