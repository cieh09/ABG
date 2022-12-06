import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  register: Register = new Register();
  registerForm: FormGroup;
  user: User = new User();
  constructor(private http: HttpClient, private fb: FormBuilder, private shardService: SharedService)  { }

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
      console.log(this.registerForm.value);

      this.shardService.validateUserInfo(this.registerForm.value).subscribe(data => {
        // data = JSON.parse(data.toString());
        this.user = data;
        if(this.user.Name != null){
          alert("Successful!");
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
  // registerForm = new FormGroup((
  //   name = new FormControl("");
  // ));
}

export class Register{
  name: string;
  password: string;
}