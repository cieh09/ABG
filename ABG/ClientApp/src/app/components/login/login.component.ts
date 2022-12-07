import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // login: Login = new Login();
  loginForm: FormGroup;
  user: User = new User();
  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private shardService: SharedService,
    private router: Router)  { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      this.shardService.validateUserInfo(this.loginForm.value).subscribe(data => {
        this.user = data;
        if(this.user.Name != null){
          alert("Successful!");
          this.router.navigateByUrl('');
        }
        else{
          alert("No such user!");
        }
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
