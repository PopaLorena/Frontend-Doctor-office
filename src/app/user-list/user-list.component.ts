import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
currentUser: string;
subscriptionList: Subscription[]=[]

  public UserList: User[];
  constructor(public userServis: UserService,
    private activatedRoute:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

}
