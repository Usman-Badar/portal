import React, { useEffect, useState } from 'react'
import './NewsPaper.css';

import axios from '../../../../../../axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsPaper = () => {

    const [ NewsPaper, setNewsPaper ] = useState([]);

    useEffect(
        () => {

            const Data = new FormData();
            Data.append('id', window.location.href.split('/').pop());
            axios.post('/getnewspaper', Data).then( res => {

                setNewsPaper( res.data );

            } ).catch( err => {

                toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

            })

        }, []
    );

    return (
        <>
            <div className="NewsPaper">
                {
                    NewsPaper.map(
                        (val, index) => {

                            return (
                                <>
                                    <h2>{val.news_papers_name}</h2>
                                    <iframe key={index} src={val.news_paper_link}></iframe>
                                </>
                            )

                        }
                    )
                }
            </div>
        </>
    )
}
 export default NewsPaper;