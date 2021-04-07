import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserOperationClaimDto } from 'app/models/operationClaim/userOperationClaimDto';
import { UserOperationClaimService } from 'app/services/userOperationClaim/user-operation-claim.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-claim',
  templateUrl: './user-claim.component.html',
  styleUrls: ['./user-claim.component.css']
})
export class UserClaimComponent implements OnInit {


  userClaims:UserOperationClaimDto = {
    claimName:[],
    userId:0,
    email: ""
  };
  usersClaims:UserOperationClaimDto[] = []
  filterText="";
  datasLoaded:boolean = false;
  dataLoaded:boolean = false;


  constructor(private userOperationClaimService:UserOperationClaimService,
    private activatedRoute : ActivatedRoute,
    private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      if (param["userId"]) {
        this.getUserClaimByUserId(param["userId"]);
      }
      else{
        this.getUserClaim();
      }
    })
  }

  getUserClaimByUserId(userId:number){
    this.userOperationClaimService.getOperaionClaimByUserId(userId).subscribe(response=>{
      this.userClaims = response.data
      this.dataLoaded = true;
    })
  }

  getUserClaim(){
    this.userOperationClaimService.getOperaionClaim().subscribe(response=>{
      this.usersClaims = response.data
      this.datasLoaded = true;
    })
  }

  deleteClaim(claimName:string){
    this.userOperationClaimService.getDeleteByUserIdClaimName(this.userClaims.userId, claimName).subscribe(response=>{
      window.location.reload();
      this.toastrService.success(response.messages)
    },
    err=>{
      this.toastrService.success(err.error)
    })
  }

}
