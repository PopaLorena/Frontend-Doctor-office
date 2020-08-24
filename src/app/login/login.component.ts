import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  formGroup: FormGroup;
  formSubmmited: boolean;
  private subscriptionList: Subscription[]= [];
  
  @Output() activUsername: EventEmitter<string> = new EventEmitter();
  @Output() valid: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }


  ngOnInit(): void {
    this.createForm();
  }

  login(): void {
    const isValid = this.formGroup.valid;
    //this.valid.emit(isValid);
    if (!isValid) {
      this.snackBar.open('Invalid username or password!');
      this.formSubmmited = true;
      return ;
    }
    console.log('is valid');
    this.router.navigate(['homePage']);
    this.username = this.formGroup.controls.username.value;
    this.password = this.formGroup.controls.password.value;
    this.activUsername.emit(this.username);
    
    this.userService.saveUser(this.username);
    this.userService.saveToken(this.username, this.password);
  }

  // saveToken(): void {
  //   const token = `Basic ${btoa(this.username + ':' + this.password)}`;
  //   console.log(token);
  //   this.userService.token = token;
  // }
  signup(): void {
    this.router.navigate(['signup']);
  }

  onBlur(controlName: string){
    console.log(controlName);
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

}
