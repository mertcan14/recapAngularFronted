import { Pipe, PipeTransform } from '@angular/core';
import { UserOperationClaimDto } from 'app/models/operationClaim/userOperationClaimDto';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: UserOperationClaimDto[], filterText: string): UserOperationClaimDto[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    return filterText?value.filter((c:UserOperationClaimDto)=> c.email.toLocaleLowerCase().indexOf(filterText) !== -1):value;
  }

}
