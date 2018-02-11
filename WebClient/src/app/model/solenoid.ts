export class ISolenoid {
    constructor(
        public Id: number,
        public Name: string,
        public Description: string,
        public HardwareType: string,
        public Address: string,
        public Value: number,
        public RequiresPump: boolean,
        public DeviceId: number
    ) {}
}
