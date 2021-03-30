import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Register } from 'app/models/auth/register';
import { UserService } from 'app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userDto:Register;
  updateUserForm:FormGroup;
  checkUser:boolean=false;
  constructor(private toastrService:ToastrService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["userId"]) {
        this.getUserDto(params["userId"]);
      }
      else{
        console.log("deneme")
      }
    })
  }
  getUserDto(userId:number){
    this.userService.getUserById(userId).subscribe(response=>{
      this.userDto = response.data;
      this.userDto.id = userId
      this.createUserForm();
    },
    err=>{
      this.toastrService.error("Listelenemedi", "Hata")
    })
    
  }
  createUserForm(){
    this.updateUserForm = this.formBuilder.group({
      email:[this.userDto.email, Validators.required],
      firstName:[this.userDto.firstName, Validators.required],
      lastName:[this.userDto.lastName, Validators.required],     
    })
    this.checkUser=true
  }

  update(){
    if (this.updateUserForm.valid) {
      let userModel:Register = Object.assign({}, this.updateUserForm.value);
      userModel.id = Number(this.userDto.id);
      userModel.password = "asd";
      console.log(userModel)
      console.log(this.updateUserForm.value)
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(response.messages,"Başarılı")
      },
      err=>{
        if (err.error.ValidationErrors.length > 0) {
          err.error.ValidationErrors.forEach(element => {
            this.toastrService.error(element.ErrorMessage, "Hata")
          });
        }
      })
    }
    else{
      this.toastrService.info("Formu Boş Bırakmasyınız", "Dikkat")
    }
  }

}
