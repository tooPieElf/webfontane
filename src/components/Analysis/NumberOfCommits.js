import React from 'react';
import {Bar} from "react-chartjs-2";

function NumberOfCommits(props) {
    const{uniqueUsers, userFreq} = props
        return (
            <div>
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
                </div>
        );
}

export default NumberOfCommits;
