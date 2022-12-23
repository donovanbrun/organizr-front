import React, { useState, useEffect } from 'react';
import { createPostit, deletePostit, getPostit, updatePostit } from '../../services/PostitService';
import './Postit.css';
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from '../../services/LoginService';

export default function Postit() {

    const [postits, setPostits] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = ()  => {
        getPostit().then(postitsData => {
            let data = postitsData.data;
            setPostits(data);
        });
    }

    let create = () => {
        createPostit({
            id: uuidv4(),
            content: "",
            userId: getUserId()
        }).then(fetchData)
    }

    let handleChange = (id, event) => {
        updatePostit({
            id: id,
            content: event.target.value,
            userId: getUserId()
        }).then(fetchData)
    }

    let handleDelete = (id) => {
        deletePostit(id).then(fetchData)
    }

    let postitsDisplay = []

    postits.forEach(postit => {
        postitsDisplay.push(
            <div className='Postit'>
                <textarea onChange={(event) => handleChange(postit.id, event)} value={postit.content}/>
                <button onClick={() => handleDelete(postit.id)}>X</button>
            </div>
        )
    })

    return (
        <div className='PostitGrid'>
            {postitsDisplay}
            <div className='Postit CreatePostit' onClick={create}>
                <p>+</p>
            </div>
        </div>
    )
}