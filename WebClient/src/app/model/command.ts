export class ICommand {
    constructor(
        public id:number,
        public commandtype:number,
        public params:string,
        public issued:Date,
        public actioned:Date,               
        public createdAt:Date,
        public updatedAt:Date
    ){}
}