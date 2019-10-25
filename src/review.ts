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