import { LongDateFormatKey } from "moment";

export interface RentalDto {
    id:number;
    brandName:string;
    customerId:string;
    rentDate:Date;
    returnDate:Date
}