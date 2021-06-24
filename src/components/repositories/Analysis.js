import React, {Component} from 'react';
import {Link} from "react-router-dom"
import axios from "axios";
import {Bar, Line} from 'react-chartjs-2';

class Analysis extends Component {
    state = {
        data: ""
    }

    async componentDidMount() {
       const _this = this;
        const res = await axios.get(`https://api.github.com/repos/${_this.props.repoName}/commits?per_page=100`);
        this.setState({
            data: res
        })
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

        console.log(uniqueDates)
        console.log(dateFreq)



        return (
            <div>
                <h4>return analysis</h4>
                <Link to="/" className='btn btn-sweet-blue btn-sm my-1'>
                    Home
                </Link>
              <div className = 'card'>
                  <Bar
                      data = {{
                          labels : uniqueUsers,
                          datasets: [
                              {
                                  label: 'number of commits',
                                  data:userFreq,
                                  backgroundColor: 'blue'
                              }
                          ]
                      }}
                      height={300}
                      width = {800}
                      options={{
                          maintainAspectRatio : false
                      }}
                  />
              </div>
                <div className='card'>
                    <Line
                        data = {{
                            labels : uniqueDates,
                            datasets: [
                                {
                                    label: 'commits timeline',
                                    data:dateFreq,
                                    backgroundColor: 'blue'
                                }
                            ]
                        }}
                        height={300}
                        width = {800}

                    />


                </div>

            </div>
        );

    }
}

export default Analysis;
