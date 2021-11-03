import React, { useState, useEffect } from 'react'
// import cover from './cover.jpg'
import './Home.css'
import Posts from './Posts'
import { useLocation } from 'react-router'
import axios from 'axios'

function Home() {
    const location = useLocation()
    const { search } = location
    console.log(search)
    const [post, setPost] = useState([]);
    useEffect(() => {
        const getOneSinglePost = async () => {
            try {
                const responsePost = await axios.get('/posts/' + search)
                console.log(responsePost.data)
                setPost(responsePost.data)
            } catch (error) {
                console.log(error)
            }

        }
        getOneSinglePost();
    }, [search])
    return (
        <>
            <div className='container'>
                <div className='contents'>
                    <h1 className='Heading'>
                        CodeSum
                    </h1>
                    <p className='homepara'>The ultimate platform for tech enthusiasts to learn,explore and share
                        stuffs related to Programming,Gadgets,Coding,Software developement,Machine Learning
                        as well as gaming !!!</p>
                </div>
                <div className="bg"></div>

            </div>
            {/* <div className="posts">Posts</div> */}
            <Posts />
            <footer className="foot">
                Copyright © 2020-2021 CodeSum LLC. All rights reserved.
            </footer>
        </>

    )
}

export default Home
