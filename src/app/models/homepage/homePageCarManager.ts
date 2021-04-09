import { HomePageCar } from "./homPageCar";

export interface HomePageCarManager extends HomePageCar{
    carName:string;
    brandName:string;
    dailyPrice:number;
}