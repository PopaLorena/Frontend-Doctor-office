 import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import{ UserService} from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

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
  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  showPatients(): void {
    
    this.router.navigate(['patients']);
  }
  goToHome():void{
    this.router.navigate(['homePage']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
  goToContact():void{
    this.router.navigate(['messages/new']);
  }
  showMessage(): void{
    this.router.navigate(['messages']);
  }
//   logout(){

// this.userService.removeAuthorization();
// this.router.navigate(['homePage']);
//   }

}
