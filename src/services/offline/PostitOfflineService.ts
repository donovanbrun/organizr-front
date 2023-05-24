let postits = [];

export const getPostit = () => {
    return new Promise((resolve) => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("postits")) {
                postits = JSON.parse(localStorage.getItem("postits"));
            }
            else {
                localStorage.setItem("postits", JSON.stringify(postits));
            }
        }
        resolve({ data: postits });
    });
}

export const createPostit = (postit) => {
    return new Promise((resolve) => {
        postits.push(postit);
        if (typeof window !== "undefined") localStorage.setItem("postits", JSON.stringify(postits));
        resolve({ data: postits });
    });
}

export const updatePostit = (postit) => {
    return new Promise((resolve) => {
        postits = postits.map((p) => {
            if (p.id === postit.id) {
                return postit;
            }
            return p;
        });
        if (typeof window !== "undefined") localStorage.setItem("postits", JSON.stringify(postits));
        resolve({ data: postits });
    });
}

export const deletePostit = (id) => {
    return new Promise((resolve) => {
        postits = postits.filter((p) => p.id !== id);
        if (typeof window !== "undefined") localStorage.setItem("postits", JSON.stringify(postits));
        resolve({ data: postits });
    });
}