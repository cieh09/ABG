import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css']
})
export class FriendDetailsComponent implements OnInit {

  @Input() friendId: any;
  friendInfo: User = new User;

  constructor(private service: SharedService) { }
  ngOnInit() {
    this.getFriendsInfo(this.friendId.Friend_id);
  }
  getFriendsInfo(id){
    this.service.validateUserInfoById(id).subscribe(data => {
      this.friendInfo = data;
    })
  }
  
}
