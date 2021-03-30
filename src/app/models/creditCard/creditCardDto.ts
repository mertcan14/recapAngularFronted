import { CreditCard } from "./creditCard";

export interface CreditCardDto extends CreditCard{
    totalPrice:number;
}