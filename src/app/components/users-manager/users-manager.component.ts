import { Component, OnInit } from '@angular/core';
import { UserInformation } from 'app/models/auth/userInformation';
import { UserService } from 'app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.css']
})
export class UsersManagerComponent implements OnInit {

  filterText:string;
  users:UserInformation[] =[];
  dataLoaded:boolean = false;
  constructor(private userService:UserService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.userService.getall().subscribe(response=>{
      this.users= response.data;
      this.dataLoaded = true;
    },
    err=>{
      this.toastrService.info("Hata Oluştu");
    })
  }

  blockingUser(userId:number){
    this.userService.blockingUser(userId).subscribe(response=>{
      this.toastrService.success(response.messages)
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
  }
}
