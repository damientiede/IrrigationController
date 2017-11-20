export class IrrigationProgram {
    id: number;
    name: string;
    start: Date;
    finished: Date;
    duration: number;
    solenoidId: number;
    requiresPump: boolean;
    deviceId: number;
    createdAt: Date;
    updatedAt: Date;
}
