import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserLogin } from 'src/app/common/userlogin';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User = new User();
  userLogin: UserLogin = new UserLogin; 

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private shardService: SharedService,
    private router: Router)  { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required]
    });
  }

  loginSubmit(){
    this.userLogin.name = this.registerForm.value.name;
    this.userLogin.password = this.registerForm.value.password;

    this.shardService.validateUserInfo(this.userLogin).subscribe(data =>{
      this.user = data
    })

    if (this.user.User_id != 0){
      alert("Successfully login");
    }else {
      alert("No such user!")
    }
    // if(this.registerForm.valid){
    //   if(this.registerForm.value.password == this.registerForm.value.re_password){
    //     console.log(this.registerForm.value);

    //   this.shardService.validateUserInfo(this.registerForm.value).subscribe(data => {
    //     this.user = data;
    //     if(this.user.Name == null){
    //       this.shardService.writeNewUserInfo(this.registerForm.value).subscribe(data => {
    //         this.user = data;
    //       });
    //       alert("Successfully create an account!");
    //       this.router.navigateByUrl('');
    //       // TODO: 跳转到首页，或是user页面
    //       // this.router.navigate(['/user-pages']);
    //     }
    //     else{
    //       alert("No such user!");
    //     }
    //   });
    //   }
    //   else{
    //     alert("Two passwords are not same!")
    //   }
    // }
    // else{
    //   alert("Info is not valid!!");
    // }
  }
}