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
      email: ["", [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
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
     
      // TODO: 跳转到首页，或是user页面
      // this.router.navigate(['/user-pages']);
      // null 说明不存在
      if(this.user.Name == null){
        this.getUserId();
      }
      else{
        alert("No such user!");
      }
    });
  }

  getUserId(){
    this.user.Name = this.registerForm.value.name.toString();
    this.user.User_email = this.registerForm.value.email.toString();
    this.user.User_password = this.registerForm.value.password.toString();
    let temp_id: number = 0;
    this.shardService.writeNewUserInfo(this.user).subscribe(data => {
      temp_id = data;
      console.log(temp_id);
      sessionStorage.setItem('name', this.registerForm.value.name);
      sessionStorage.setItem('email', this.registerForm.value.email);
      sessionStorage.setItem('id', temp_id.toString());
      sessionStorage.setItem('password', this.registerForm.value.password);
    });

    this.getPremiumId(temp_id);

    this.getGamesByUserId(temp_id);

    alert("Successfully create an account! You can now login with registered info.");
    this.router.navigateByUrl('');
  }

  getPremiumId(temp_id){
    this.shardService.getVaildMembership(temp_id).subscribe(data => {
      sessionStorage.setItem('PremiumSale_id', data.PremiumSale_id);
    });
  }

  getGamesByUserId(temp_id){
    this.shardService.getGamesByUserId(temp_id).subscribe(data => {
      sessionStorage.setItem('userOwnedGamesList', JSON.stringify(data));
    });
  }

  verifyUser(name){
    this.shardService.verifyUserRegister(name).subscribe(data => {
      if(data > 0){
        this._snackBar.open('User already registered.', '',{
          duration: 5000
        });
        window.location.reload();
      }else{
        this.validInfo();
      }
    });
  }
}