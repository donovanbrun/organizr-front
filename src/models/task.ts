import { v4 as uuidv4 } from 'uuid';

export default class Task {

    constructor(
        public id: string = uuidv4(),
        public ownerId: string = "",
        public workspaceId: string = "",
        public title: string = "",
        public description: string = "",
        public deadline: Date = new Date(),
        public status: string = "Normal",
        public creationDate: Date = new Date(),
        public updateDate: Date = new Date
    ) { }
}