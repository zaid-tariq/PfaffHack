class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    contact: string;
    email: string;
    
    constructor(firstName: string, lastName: string, username: string, password: string, contact: string, email: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.contact = contact;
        this.email = email;
    }

    Ride_Offer() {
        
    }

    Ride_Search() {

    }

}

class Review {
    id: number;
    writtenBy: number;
    writtenFor: number;
    rating: number;
    comments: string;

    constructor(writtenBy: number, writtenFor: number, rating: number, comments: string){
        this.writtenBy = writtenBy;
        this.writtenFor = writtenFor;
        this.rating = rating;
        this.comments = comments;
    }
}

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