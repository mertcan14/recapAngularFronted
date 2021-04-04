import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      firstName:["", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName:["",[ Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let registerModule = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModule)
    }
    else{
      this.toastrService.info("Formu Doldurunuz", "Dikkat")
    }
  }
}
