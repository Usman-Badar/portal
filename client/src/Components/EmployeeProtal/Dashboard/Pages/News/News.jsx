import React, { useEffect, useState } from 'react';
import './News.css';

import axios from '../../../../../axios';
import { useHistory } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const News = () => {

    const history = useHistory();
    const [ NewsPapers, setNewsPapers ] = useState([]);

    useEffect(
        () => {

            axios.get('/getallnewspapers').then( res => {

                setNewsPapers( res.data );

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

            } );

        }, []
    );

    const GoToNewsPaper = ( id ) => {

        history.replace('/news/newspaper/' + id);

    }

    return (
        <>
            <h1 className="text-center mt-3 mb-0">Newspapers</h1>
            <div className="Employee_Portal_news">
                {
                    NewsPapers.map(
                        (val, index) => {

                            return (
                                <>
                                    <div className='Employee_Portal_news_divs' key={index} onClick={() => { GoToNewsPaper(val.id) }} style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                        <div>
                                            <img src={'images/news_papers/' + val.news_papers_title_image} alt="news papers" />
                                            <p className='mb-0' style={ { fontSize: '12px' } }>{val.news_papers_name}</p>
                                        </div>
                                    </div>
                                </>
                            )

                        }
                    )
                }
            </div>
        </>
    )
}
export default News;