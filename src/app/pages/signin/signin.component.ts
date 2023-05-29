import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Route, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  formLogin: FormGroup;
  constructor(private authservice: AuthService, private fb: FormBuilder, private userservice: UserService, 
    private router: Router, private storage:StorageService,
    private alertservice:AlertService) {

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
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signIn() {
    if (this.formLogin.valid) {
      try {
        const email = this.formLogin.get('email')!.value;
        const password = this.formLogin.get('password')!.value;
  
        let result = await this.authservice.signIn(email, password);
  
        if (result != null) {
          let user = await this.userservice.getUserByUid(result.user.uid);
  
          if (user != null) {
            this.storage.setSession(user);
            this.router.navigate(['biblioteca']);
          } else {
            this.alertservice.showErrorMessage("Error en la base de datos");
          }
        } else {
          this.alertservice.showErrorMessage("Error con firebase");
        }
      } catch (error:any) {
        if (error.code === "auth/wrong-password") {
          this.alertservice.showErrorMessage("Contraseña incorrecta");
        } else {
          this.alertservice.showErrorMessage("Error de conexión");
        }
      }
    }
  }
}  

