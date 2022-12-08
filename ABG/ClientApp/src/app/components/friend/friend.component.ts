import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})

export class FriendComponent implements OnInit {

  user: User = new User();
  userForm: FormGroup;

  username: any = '';
  email: any = '';
  password: any = '';

  friendsIds: any[];

  constructor(private fb: FormBuilder, private service: SharedService, public dialog: MatDialog, private router: Router) { 
  }
  ngOnInit() {
    this.user.Name = sessionStorage.getItem('name');
    this.user.User_email = sessionStorage.getItem('email');
    this.user.User_id = Number(sessionStorage.getItem('id'));
    this.user.User_password = sessionStorage.getItem('password');

    this.createForm();
  }

  openDialog(friendsId) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: friendsId,
      },
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(post: FormGroup){
    this.username = post.value.name;
    this.email = post.value.email;
    this.password = post.value.password;
    this.updateUserInfo();
  }

  logout(){
    sessionStorage.clear();
    this.userForm.reset();
    this.router.navigateByUrl('login');
  }

  updateUserInfo() {
    this.service.updateUser(this.user).subscribe(data =>
      {
        console.log("Update User Status: " +data);
        sessionStorage.clear();
        sessionStorage.setItem('name', this.user.Name); 
        sessionStorage.setItem('email', this.user.User_email); 
        sessionStorage.setItem('id', this.user.User_id.toString()); 
        sessionStorage.setItem('password', this.user.User_password); 
      }
      )
  }

  getFriendsId(){
    this.service.getFriendList(this.user.User_id).subscribe(data =>
      {
        this.friendsIds = [...data];
      })
  }
}
