class Trip {
    id: number;
    driver: number;
    passenger: number;
    rideId: number;

    constructor(driver: number, passenger: number, rideId: number){
        this.driver = driver;
        this.passenger = passenger;
        this.rideId = rideId;
    }
}