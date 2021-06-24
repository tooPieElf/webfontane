import React, {Component} from 'react';
import {Link} from "react-router-dom"
import axios from "axios";
import NumberOfCommits from "./NumberOfCommits";
import TimeLine from "./TimeLine";
import CommitUsers from "./CommitUsers";
import Spinner from "../layout/Spinner";

class Analysis extends Component {
    state = {
        data: "",
        loading: false
    }

    async componentDidMount() {
       const _this = this;
       if(_this.props.repoName){
           this.setState({loading: true});
           const res = await axios.get(`https://api.github.com/repos/${_this.props.repoName}/commits?per_page=100`);
           this.setState({
               data: res
           })
       }
        this.setState({loading: false})
    }


    render() {
        let userData = this.state.data;
        let dataValue;
        let dateValue;
        let formatDateValue
        let userFrequency;
        let dateFrequency;
        let uniqueUsers;
        let userFreq;
        let uniqueDates;
        let dateFreq;

        if(Object.entries(userData).length > 0) {
            dataValue = userData.data.map(r=> (r.commit.author.name))
            dateValue = userData.data.map(r=> (r.commit.author.date))
            formatDateValue = dateValue.map(e=>(new Date(Date.parse(e)).toLocaleDateString()))
            dateFrequency=formatDateValue.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
            userFrequency=dataValue.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
            uniqueUsers = [...userFrequency.keys()]
            userFreq = [...userFrequency.values()]
            uniqueDates = [...dateFrequency.keys()]
            dateFreq = [...dateFrequency.values()]
        }

        console.log(dateValue)
        const{loading} =this.state;
        return (

            <div>
                <h3> list of commiters</h3>
                <Link to="/" className='btn btn-sweet-blue btn-sm my-1'>
                    Home
                </Link>
                {
                    loading ? <Spinner/> :

                        <>
                            <CommitUsers  uniqueUsers = {uniqueUsers}/>
                    <NumberOfCommits uniqueUsers = {uniqueUsers} userFreq = {userFreq} />
                    <TimeLine uniqueDates = {uniqueDates} dateFreq ={dateFreq}/>
                        </>
                }




            </div>
        );

    }
}

export default Analysis;
