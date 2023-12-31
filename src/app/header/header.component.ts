import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
constructor(private userAuthService : UserAuthService,
  private userService : UserService,
  private router : Router
  ){}

  ngOnInit(): void {
  }
public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
}

public logOut(){
  this.userAuthService.clear();
  this.userService.logout().subscribe(
    (response)=>{

    },(error)=>{
      console.log(error);
    }
  )
  this.router.navigate(['/']);
}
public roleMatch (requiredRoles: any[]): boolean{
 return  this.userService.roleMatch(requiredRoles);
}

public isAdmin(){
  return this.userAuthService.isAdmin();
}

}
