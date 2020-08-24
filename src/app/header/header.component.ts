 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ UserService} from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router, public userService: UserService) { }

  curentUser:string;
 public curentAuthority: string;
 subscriptionList: Subscription[]=[];

  ngOnInit(): void {
    this.subscriptionList.push(
      this.userService.loggedInUser.subscribe((username: string) => {
        if (username === 'unknown') {
          this.curentUser = '';
        } else {
          this.curentUser = username;
        }
      })
    )
  }

  showPatients(): void {
    
    this.router.navigate(['patients']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
//   logout(){

// this.userService.removeAuthorization();
// this.router.navigate(['homePage']);
//   }

}
