import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInformation } from 'app/models/auth/userInformation';
import { OperationClaim } from 'app/models/operationClaim/operationClaim';
import { UserOperationClaim } from 'app/models/operationClaim/userOperationClaim';
import { UserService } from 'app/services/user/user.service';
import { OperationClaimService } from 'app/services/userOperationClaim/operation-claim.service';
import { UserOperationClaimService } from 'app/services/userOperationClaim/user-operation-claim.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user-claim',
  templateUrl: './add-user-claim.component.html',
  styleUrls: ['./add-user-claim.component.css']
})
export class AddUserClaimComponent implements OnInit {

  claims:OperationClaim[]=[]
  userId:number;
  users:UserInformation[]=[];
  addUserOperationClaimForm:FormGroup;
  addUsersOperationClaimForm:FormGroup;
  userDataLoaded:boolean = false;
  usersDataLoaded:boolean = false;
  constructor(private operationClaimService:OperationClaimService,
    private activatedRoute : ActivatedRoute,
    private toastrService : ToastrService,
    private formBuilder:FormBuilder,
    private userOperationClaimService:UserOperationClaimService,
    private router:Router,
    private userService:UserService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      if (param["userId"]) {
        this.createClaimForm();
        this.userId=param["userId"]
      }
      else{
        this.createUsersClaimForm();
      }
    })
  }

  createClaimForm(){
    this.addUserOperationClaimForm = this.formBuilder.group({
      operationClaimId:["", Validators.required]
    })
    this.getAll();
    this.userDataLoaded = true;
  }

  createUsersClaimForm(){
    this.addUsersOperationClaimForm = this.formBuilder.group({
      userId:["", Validators.required],
      operationClaimId:["", Validators.required]
    })
    this.getAll();
    this.getAllUsers();
    this.usersDataLoaded = true;
  }

  add(){
    if (this.addUserOperationClaimForm.valid) {
      let userOperationClaim:UserOperationClaim = Object.assign({}, this.addUserOperationClaimForm.value);
      userOperationClaim.userId = Number(this.userId);
      userOperationClaim.operationClaimId = Number(userOperationClaim.operationClaimId)
      this.userOperationClaimService.postAdd(userOperationClaim).subscribe(response => {
        this.router.navigate(["/user/claims/"+this.userId])
        this.toastrService.success(response.messages, "Başarılı")
      },
      err=>{
        if (err.error.ValidationErrors.length>0) {
          err.error.ValidationErrors.forEach(element =>{
            this.toastrService.error(element.ErrorMessage, "Hata")
          })
        }
      })
    }
  }

  addUsers(){
    if (this.addUsersOperationClaimForm.valid) {
      let userOperationClaim:UserOperationClaim = Object.assign({}, this.addUsersOperationClaimForm.value);
      userOperationClaim.userId = Number(userOperationClaim.userId);
      userOperationClaim.operationClaimId = Number(userOperationClaim.operationClaimId)
      this.userOperationClaimService.postAdd(userOperationClaim).subscribe(response => {
        this.router.navigate(["/user/claims/"+userOperationClaim.userId])
        this.toastrService.success(response.messages, "Başarılı")
       },
       err=>{
         if (err.error.ValidationErrors.length>0) {
           err.error.ValidationErrors.forEach(element =>{
             this.toastrService.error(element.ErrorMessage, "Hata")
           })
         }
      })
    }
  }

  getAll(){
    this.operationClaimService.getAll().subscribe(response=>{
      this.claims = response.data
    })
  }

  getAllUsers(){
    this.userService.getall().subscribe(response=>{
      this.users = response.data
    },
    err=>{
      this.toastrService.error(err.error);
    })
  }
}
