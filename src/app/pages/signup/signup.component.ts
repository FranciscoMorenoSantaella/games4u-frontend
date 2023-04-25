import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    
    
  
    formSignUp:FormGroup;
    constructor(private authservice:AuthService, private fb: FormBuilder,private loadingservice:LoadingService,private userservice:UserService, private router:Router){
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
    
      this.signUp();
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
          }
          console.log(newUser);
         let user = await this.userservice.createUser(newUser);
         if(user!=null){
           //this.storage.set('client',client);
           this.router.navigate(['juegos']);
         }else{
           //this.alertservice.presentToast("Error al crear el usuario en la base de datos","danger");
         }
      }else{
        //this.alertservice.presentToast("Los datos del formulario no son validos","danger");
      }
    }
}
