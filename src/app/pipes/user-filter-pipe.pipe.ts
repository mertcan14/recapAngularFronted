import { Pipe, PipeTransform } from '@angular/core';
import { UserInformation } from 'app/models/auth/userInformation';

@Pipe({
  name: 'userFilterPipe'
})
export class UserFilterPipePipe implements PipeTransform {

  transform(value: UserInformation[], filterText: string): UserInformation[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((c:UserInformation)=> c.email.toLocaleLowerCase().indexOf(filterText) !== -1):value;
  }

}
