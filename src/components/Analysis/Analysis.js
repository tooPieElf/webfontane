import React, { useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import axios from "axios";
import NumberOfCommits from "./NumberOfCommits";
import TimeLine from "./TimeLine";
import CommitUsers from "./CommitUsers";
import Spinner from "../layout/Spinner";

function Analysis({repoName}) {
    const [data, setData] = useState( []);
    const [loading, setLoading] = useState(false);

    useEffect(  () => {
        setLoading(true);
        const fetchData = async () =>{
            if(repoName){

                const res = await axios.get(`https://api.github.com/repos/${repoName}/commits?per_page=100`);
                setData(res);
            }
        }
        fetchData().then();
            setLoading(false);

    }, []);

        let userData = data;
        let dataValue,dateValue, formatDateValue, userFrequency, dateFrequency, uniqueUsers, userFreq, uniqueDates,dateFreq;


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
        return (

            <div>

                <Link to="/" className='btn btn-sweet-blue btn-sm my-1'>
                    Home
                </Link>
                <h3>Contributors</h3>
                {
                    loading ? <Spinner/> :
                        <>
                            <CommitUsers  uniqueUsers = {uniqueUsers}/>
                            <h3>Contributors Impact</h3>
                    <NumberOfCommits uniqueUsers = {uniqueUsers} userFreq = {userFreq} />
                            <h3> Repository Commit Timeline</h3>
                    <TimeLine uniqueDates = {uniqueDates} dateFreq ={dateFreq}/>
                        </>
                }
            </div>
        );

}

export default Analysis;
