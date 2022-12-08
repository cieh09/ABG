import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/common/userlogin';
import { Membership } from 'src/app/common/membership';

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
  membership: Membership = new Membership();

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
        localStorage.setItem('name', this.user.Name);
        localStorage.setItem('email', this.user.User_email);
        localStorage.setItem('id', this.user.User_id.toString());
        localStorage.setItem('password', this.user.User_password);

        this.shardService.getVaildMembership(this.user.User_id).subscribe(data => {
          localStorage.setItem('PremiumSale_id', data.PremiumSale_id);
        });
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
