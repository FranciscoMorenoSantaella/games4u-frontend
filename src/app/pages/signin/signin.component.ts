import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Route, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  formLogin: FormGroup;
  constructor(private authservice: AuthService, private fb: FormBuilder, private userservice: UserService, private router: Router, private storage:StorageService) {

    this.formLogin = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async signIn() {
   
    if (this.formLogin.valid) {
      try {
        let result = await this.authservice.signIn(this.formLogin.get('email')!.value, this.formLogin.get('password')!.value);
        if (result && result.user) {
          let user = await this.userservice.getUserByUid(result.user.uid);
          this.storage.setSession(user);
          this.router.navigate(['biblioteca']);
        } else {
          console.log("result o result.user es nulo o indefinido");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
