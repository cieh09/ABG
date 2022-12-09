import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { StatusCodes } from 'http-status-codes';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User = new User();

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private shardService: SharedService,
    private _snackBar: MatSnackBar,
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
    if(this.registerForm.valid){
      if(this.registerForm.value.password == this.registerForm.value.re_password){
        console.log(this.registerForm.value);
        this.verifyUser(this.registerForm.value.name);
      }
      else{
        alert("Two passwords are not same!")
      }
    }
    else{
      alert("Info is not valid!!");
    }
  }

  validInfo(){
    this.shardService.validateUserInfo(this.registerForm.value).subscribe(data => {
      this.user = data;
      if(this.user.Name == null){
        this.shardService.writeNewUserInfo(this.registerForm.value).subscribe(data => {
          this.user = data;
        });
        alert("Successfully create an account! You can now login with registered info.");
        this.router.navigateByUrl('');
        // TODO: 跳转到首页，或是user页面
        // this.router.navigate(['/user-pages']);
      }
      else{
        alert("No such user!");
      }
    });
  }

  verifyUser(name){
    this.shardService.verifyUserRegister(name).subscribe(data => {
      if(data > 0){
        this._snackBar.open('User already registered.', '',{
          duration: 2000
        });
        window.location.reload();
      }else{
        this.validInfo();
      }
    });
  }
}