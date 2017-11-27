export class IDevice {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public state: string,
        public mode: string,
        public status: string,
        public pumpSolenoidId: number,
        public softwareVersion: string,
        public deviceMAC: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
