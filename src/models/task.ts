export default class Task {
    id: string;
    userId: string;
    name: string;
    description: string;
    deadline: Date;
    status: string;
    creationDate: Date;
    modificationDate: Date;
    tags: []

    constructor(id: string, userId: string, name: string, description: string, deadline: Date, status: string, creationDate: Date, modificationDate: Date, tags: []) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
        this.tags = tags;
    }
}