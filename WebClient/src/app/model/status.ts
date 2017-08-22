export class IrrigationControllerStatus {
    state:string;
    mode:string
    pressure:number;
    station:number;    
    start:Date;
    duration:number;
    scheduleId:number;
    inputs:string;
    outputs:string;
}