import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/common/userlogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // login: Login = new Login();
  loginForm: FormGroup;
  user: User = new User();
  userLogin: UserLogin = new UserLogin();

  constructor(private http: HttpClient, private fb: FormBuilder, private shardService: SharedService)  { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      this.userLogin.name = this.loginForm.value.name;
      this.userLogin.password = this.loginForm.value.password;
      this.shardService.validateUserInfo(this.userLogin).subscribe(data => {
        this.user.Name = data.Name;
        this.user.User_email = data.User_email;
        this.user.User_id = data.User_id;
        this.user.User_password = data.User_password;

        if(data.User_id > 0){
          
          alert("Login successful.");
        }else{
          alert("Login failed.");
        }
        localStorage.setItem('username', this.user.Name);
        localStorage.setItem('email', this.user.User_email);
      }); 
    }
    else{
      alert("Info is not valid!!");
    }
  }
}

// export class Login{
//   name: string;
//   password: string;
// }
