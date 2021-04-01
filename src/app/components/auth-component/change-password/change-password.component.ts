import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'app/models/auth/login';
import { AuthService } from 'app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user:Login ;
  passwordCahengeForm:FormGroup;
  pageLoaded:boolean = false;
  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createPasswordForm();
  }

  createPasswordForm(){
    this.passwordCahengeForm = this.formBuilder.group({
      password:["", Validators.required]
    })
  }

  change(){
    if (this.passwordCahengeForm.valid) {
      this.user = Object.assign({}, this.passwordCahengeForm.value);
      this.user.email = this.authService.getEmail();
      this.authService.changePassword(this.user)
    }
  }

}
