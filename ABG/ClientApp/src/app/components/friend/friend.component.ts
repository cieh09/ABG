import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  user: User = new User();

  constructor() { }
  ngOnInit() {
    this.user.Name = localStorage.getItem('name');
    this.user.User_email = localStorage.getItem('email');
    this.user.User_id = Number(localStorage.getItem('id'));
    this.user.User_password = localStorage.getItem('password');
  }

}
