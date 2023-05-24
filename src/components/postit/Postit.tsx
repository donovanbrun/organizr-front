import React, { useState, useEffect } from 'react';

import { createPostit, deletePostit, getPostit, updatePostit } from '../../services/offline/PostitOfflineService';
import styles from '../../styles/Postit.module.css';
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
            let sorted = data.sort((a, b) => {
                if (a.creationDate > b.creationDate) {
                    return 1;
                }
                if (a.creationDate < b.creationDate) {
                    return -1;
                }
                return 0;
            });
            setPostits(sorted);
        });
    }

    let create = () => {
        createPostit({
            id: uuidv4(),
            content: "",
            userId: getUserId()
        }).then(fetchData)
    }

    let handleChange = (postit, event) => {
        if (event.target.value?.length < 255) {
            updatePostit({
                id: postit.id,
                content: event.target.value,
                userId: postit.userId,
                creationDate: postit.creationDate
            }).then(fetchData)
        }
    }

    let handleDelete = (id) => {
        deletePostit(id).then(fetchData)
    }

    let postitsDisplay = []

    postits.forEach((postit) => {
        postitsDisplay.push(
            <div className={styles.Postit}>
                <textarea onChange={(event) => handleChange(postit, event)} value={postit.content} spellCheck="false"/>
                <button onClick={() => handleDelete(postit.id)}>X</button>
            </div>
        )
    })

    return (
        <div className={styles.PostitGrid}>
            {postitsDisplay}
            <div className={[styles.Postit, styles.CreatePostit].join(" ")} onClick={create}>
                <p>+</p>
            </div>
        </div>
    )
}