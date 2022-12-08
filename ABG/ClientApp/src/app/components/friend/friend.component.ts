import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';

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

  constructor(private fb: FormBuilder, private service: SharedService) { }
  ngOnInit() {

    this.user.Name = localStorage.getItem('name');
    this.user.User_email = localStorage.getItem('email');
    this.user.User_id = Number(localStorage.getItem('id'));
    this.user.User_password = localStorage.getItem('password');

    this.createForm();
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
    localStorage.clear();
    this.userForm.reset();
  }

  updateUserInfo() {
    this.service.updateUser(this.user).subscribe(data =>
      {
        console.log("Update User Status: " +data);
        localStorage.clear();
        localStorage.setItem('name', this.user.Name); 
        localStorage.setItem('email', this.user.User_email); 
        localStorage.setItem('id', this.user.User_id.toString()); 
        localStorage.setItem('password', this.user.User_password); 
      }
      )
  }

}
