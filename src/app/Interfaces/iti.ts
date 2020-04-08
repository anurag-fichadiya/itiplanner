import { Observable } from 'rxjs';

export class iti
{
    imgurl : Observable<any>;
    id : string; 
    city : string;
    daysCount : string;
    places : string[];
    ratings : number;
    totalCost : number ;
    /*constructor (id : string, daysCount : string, places : Iplaces, ratings : number, totalCost : number)
    {
        this.totalCost = totalCost
        this.ratings = ratings
        this.places = places
        this.id = id
        this.daysCount = daysCount
    }*/
}
