import { CarDto } from "../carDto";

export interface CarWithImageDto extends CarDto{
    imagePath:string[];
}