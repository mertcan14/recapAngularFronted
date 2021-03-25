import { CarDto } from "./carDto";
import { ResponseModel } from "./responseModel";

export interface CarResponseModel extends ResponseModel{
    data:CarDto[]
}