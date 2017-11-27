export class IIrrigationProgram {
    constructor(
        public id: number,
        public name: string,
        public start: Date,
        public finished: Date,
        public duration: number,
        public solenoidId: number,
        public requiresPump: boolean,
        public deviceId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
