import React, { useEffect, useState } from 'react';

import './Home.css';
import { Pie } from 'react-chartjs-2';
import ReactTooltip from 'react-tooltip';

const Home = (props) => {

    const [ChartData, setChartData] = useState({});

    const [EmpData, setEmpData] = useState({});
    
    const [TotalValue, setTotalValue] = useState(0.00);

    useEffect(
        () => {

            // IMPORTANT VARIABLES
            let count = [];
            let rejected = 0;
            let approved = 0;
            let waiting = 0;
            let sent = 0;
            let viewed = 0;

            // FOR REJECTED
            for (let x = 0; x < props.CountStatus.length; x++) {

                if (props.CountStatus[x] === 'Rejected') {
                    rejected = rejected + 1;
                }

            }

            // FOR APPROVED
            for (let x = 0; x < props.CountStatus.length; x++) {

                if (props.CountStatus[x] === 'Approved') {
                    approved = approved + 1;
                }

            }

            // FOR WAITING
            for (let x = 0; x < props.CountStatus.length; x++) {

                if (props.CountStatus[x] === 'Waiting For Approval') {
                    waiting = waiting + 1;
                }

            }

            // FOR SENT
            for (let x = 0; x < props.CountStatus.length; x++) {

                if (props.CountStatus[x] === 'Sent') {
                    sent = sent + 1;
                }

            }

            // FOR VIEWED
            for (let x = 0; x < props.CountStatus.length; x++) {

                if (props.CountStatus[x] === 'Viewed') {
                    viewed = viewed + 1;
                }

            }

            count.push(
                rejected,
                approved,
                waiting,
                sent,
                viewed
            )

            setChartData(
                {
                    labels: ['Rejected', 'Approved', 'Waiting For Approval', 'Sent', 'Viewed'],
                    datasets: [
                        {
                            label: 'Requests for the year',
                            data: count,
                            backgroundColor: [
                                '#DC3545',
                                '#28A745',
                                '#FFC107',
                                '#17A2B8',
                                '#007BFF'
                            ]
                        }
                    ]
                }
            );


        }, [props.CountStatus]
    );

    useEffect(
        () => {

            let total = 0.00;
            for( let x = 0; x < props.ViewRequest.length; x++ )
            {

                total = total + parseFloat( props.ViewRequest[x].total );

            }

            setTotalValue( total );

        }, [ props.ViewRequest ]
    )

    useEffect(
        () => {

            setEmpData( props.EmpData );

        }, [ props.EmpData ]
    )

    useEffect(
        () => {

            ReactTooltip.rebuild();

        }
    )

    return (
        <div className="Home">
            <ReactTooltip />
            <div className="three">
                <div className="Calculate px-4">
                    <small className="text-secondary">Total Requests</small>
                    <h1 className="font-weight-bolder">
                        {props.CountRequests} <small className="text-secondary">Sent</small>
                    </h1>
                </div>
                <div className="RequestStatusChart">
                    <Pie
                        width='100%'
                        height='100px'
                        data={ChartData}
                    />
                </div>
                <div className="RequestStatusChart" style={ { background: 'none' } }>
                    {/* <Pie
                        width='100%'
                        height='100px'
                        data={ChartData}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;