import { v4 as uuidv4 } from 'uuid';

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

    constructor(id: string = uuidv4(), userId: string = "", name: string = "", description: string = "", deadline: Date = new Date(), status: string = "Normal", creationDate: Date = new Date(), modificationDate: Date = new Date, tags: [] = []) {
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