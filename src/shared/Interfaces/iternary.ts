export interface city {
    $key? : string,
    iter : itinerary []
}

export interface days {
    $key? : string,
    noOfDays : number,
    place : string,
    price : number
}

export interface placeModel{
    $key? : string,
    placeModel : days []
}

export interface itinerary{
    $key? : string,
    daysCount : number,
    placeModels : placeModel [ ],
    ratings : number,
    tags : string[]    
}