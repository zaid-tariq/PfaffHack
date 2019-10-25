class Ride {
    id: number;
    offeredBy: number;
    startPoint: string;
    endPoint: string;
    availableSeats: number;

    constructor(offeredBy: number, startPoint: string, endPoint: string, availableSeats: number){
        this.offeredBy = offeredBy;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.availableSeats = availableSeats;
    }
}