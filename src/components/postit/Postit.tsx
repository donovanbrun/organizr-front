import React, { useState, useEffect } from 'react';

//import { createPostit, deletePostit, getPostit, updatePostit } from '../../services/offline/PostitOfflineService';
import { createPostit, deletePostit, getPostit, updatePostit } from '../../services/PostitService';
import styles from '../../styles/Postit.module.css';
import { AxiosResponse } from 'axios';

export default function Postit() {

    const [postits, setPostits] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        getPostit().then((postitsData: AxiosResponse) => {
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
        const workspace = JSON.parse(localStorage.getItem("workspace"));
        createPostit({
            workspaceId: workspace?.id,
            content: "",
        }).then(fetchData)
    }

    let handleChange = (postit, event) => {
        const workspace = JSON.parse(localStorage.getItem("workspace"));
        if (event.target.value?.length < 255) {
            updatePostit({
                id: postit.id,
                content: event.target.value,
                workspaceId: workspace?.id,
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
                <textarea aria-label={postit.content} onInputCapture={(event) => handleChange(postit, event)} value={postit.content} spellCheck="false" />
                <button onClick={() => handleDelete(postit.id)}>✕</button>
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