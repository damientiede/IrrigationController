export class ISolenoid {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public hardwareType: string,
        public address: string,
        public value: number,
        public requiresPump: boolean,
        public deviceId: number
    ) {}
}
