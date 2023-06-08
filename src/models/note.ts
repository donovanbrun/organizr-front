import { v4 as uuidv4 } from 'uuid';

export default class Note {
    id: string;
    userId: string;
    name: string;
    content: string;
    updateDate: Date;

    constructor(id: string = uuidv4(), userId: string = "", name: string = "", content: string = "", updateDate: Date = new Date()) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.content = content;
        this.updateDate = updateDate;
    }
}
