import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    
    
  
    formSignUp:FormGroup;
    constructor(private authservice:AuthService, private fb: FormBuilder,private loadingservice:LoadingService,
      private userservice:UserService, private router:Router,private alertservice:AlertService,
      private storage:StorageService){
      this.formSignUp = this.fb.group({
        name: ['', [Validators.required,Validators.minLength(4)]],
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


    ngOnInit(){
    }


    async signUp(){
      if(this.formSignUp.valid){
          let result = await this.authservice.signUp(this.formSignUp.get('email')!.value,
          this.formSignUp.get('password')!.value)
          let newUser:User = {
            id: -1,
            name: this.formSignUp.get('name')!.value,
            email: this.formSignUp.get('email')!.value,
            uid: result.user.uid,
            admin: false,
            balance:0
          }
         let user = await this.userservice.createUser(newUser);
         if(user!=null){
           this.storage.setSession(user);
           this.router.navigate(['juegos']);
         }else{
           this.alertservice.showErrorMessage("Error al crear el usuario en la base de datos");
         }
      }else{
        this.alertservice.showErrorMessage("Los datos del formulario no son validos");
      }
    }
}
