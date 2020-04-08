import { Observable } from 'rxjs';
export interface days 
{
    day : string []
}
export class iti_adv
{
    imgurl : Observable<any>; 
    city : string;
    daysCount : number;
    id : string;
    placesModels : days[];
    ratings : number;
    uid : string;
    tag0 : string;
    tag1 : string;
    tag2 : string;
    tag3 : string;
    tag4 : string;
    totalCost : number ;
    bag : string;

    /*constructor (id : string, daysCount : string, places : Iplaces, ratings : number, totalCost : number)
    {
        this.totalCost = totalCost
        this.ratings = ratings
        this.places = places
        this.id = id
        this.daysCount = daysCount
    }*/
}
