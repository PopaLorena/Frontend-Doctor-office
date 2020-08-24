import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username: string;
  password: string;
  email: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  signup(): void {
    const user: User =new User(this.username, this.email, this.password );

    this.userService.addUser(user).subscribe((response) => {
      this.router.navigate(['homePage']);
      this.userService.saveToken(user.username,user.password);
      this.userService.saveUser(user.username);
    });
  }

}