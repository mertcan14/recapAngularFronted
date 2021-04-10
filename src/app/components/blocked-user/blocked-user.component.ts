import { Component, OnInit } from '@angular/core';
import { BlockedUser } from 'app/models/auth/blockedUser';
import { BlockedUserService } from 'app/services/blockedUser/blocked-user.service';
import { UserService } from 'app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blocked-user',
  templateUrl: './blocked-user.component.html',
  styleUrls: ['./blocked-user.component.css']
})
export class BlockedUserComponent implements OnInit {

  dataLoaded:boolean = false;
  users:BlockedUser[]=[];
  constructor(private blockedUserService:BlockedUserService,
    private toastrService:ToastrService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.blockedUserService.getAll().subscribe(response=>{
      this.users = response.data;
      this.dataLoaded = true
    })
  }

  removeBlockedUser(userId:number){
    this.userService.removeBlockedUser(userId).subscribe(response=>{
      this.toastrService.success(response.messages);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
  }
}
