import { LongDateFormatKey } from "moment";

export interface Rental {
    id:number;
    brandName:string;
    customerId:string;
    rentDate:Date;
    returnDate:Date
}