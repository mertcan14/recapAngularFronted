import { UserInformation } from "./userInformation";

export interface BlockedUser extends UserInformation{
    blockingDate:Date
}