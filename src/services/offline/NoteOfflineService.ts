let notes = [];

export const getNotes = () => {
    return new Promise((resolve) => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("notes")) {
                notes = JSON.parse(localStorage.getItem("notes"));
            }
            else {
                localStorage.setItem("notes", JSON.stringify(notes));
            }
        }
        resolve({data: notes});
    })
}

export const getNoteById = (id) => {
    return new Promise((resolve) => {
        const note = notes.find((n) => n.id === id);
        resolve({data: note});
    })
}

export const saveNote = (note) => {
    return new Promise((resolve) => {
        if (notes.find((n) => n.id === note.id) === undefined) {
            notes.push(note);
        }
        else {
            notes = notes.map((n) => {
                if (n.id === note.id) {
                    return note;
                }
                return n;
            });
        }

        if (typeof window !== "undefined") localStorage.setItem("notes", JSON.stringify(notes));
        resolve({data: notes});
    })
}

export const deleteNote = (noteId) => {
    return new Promise((resolve) => {
        notes = notes.filter((n) => n.id !== noteId);
        if (typeof window !== "undefined") localStorage.setItem("notes", JSON.stringify(notes));
        resolve({data: notes});
    })
}