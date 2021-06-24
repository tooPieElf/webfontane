import React from 'react';
import {Line} from "react-chartjs-2";
function TimeLine(props) {
    const{uniqueDates,dateFreq} = props
        return (
            <div>
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

export default TimeLine;
