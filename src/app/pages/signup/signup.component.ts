import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    translations:any;



  
    formSignUp:FormGroup;
    constructor(private authservice:AuthService, private fb: FormBuilder,private loadingservice:LoadingService,
      private userservice:UserService, private router:Router,private alertservice:AlertService,
      private storage:StorageService, private translationservice:TranslationService){
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
        password: ['', [Validators.required, Validators.minLength(6)]],
      });

    }

    ngOnInit(){
      const lang = 'en'; // Idioma seleccionado
      this.translationservice.loadTranslations(lang).then(() => {
      this.translations = {
        password: this.translationservice.getTranslation('password'),
        signin: this.translationservice.getTranslation("signin"),
        signup:this.translationservice.getTranslation("signup"),
        name:this.translationservice.getTranslation("name"),
      };
      })
    }

    async signUp() {
      if (this.formSignUp.valid) {
        let user: User | null = null;
        let result: any;
        
        try {
          result = await this.authservice.signUp(
            this.formSignUp.get('email')!.value,
            this.formSignUp.get('password')!.value
          );
          console.log(result);
    
          const newUser: User = {
            id: -1,
            name: this.formSignUp.get('name')!.value,
            email: this.formSignUp.get('email')!.value,
            uid: result.user.uid,
            admin: false,
            balance: 0,
          };
    
          user = await this.userservice.createUser(newUser);
    
          if (!user) {
            this.authservice.deleteUser(result.user.uid)
            throw new Error('Error al crear el usuario en la base de datos');
          }
        } catch (error: any) {          
          if (error.code === 'auth/email-already-in-use') {
            this.alertservice.showErrorMessage('El correo electrónico ya está en uso');
          } else {
            this.alertservice.showErrorMessage('No se ha podido establecer la conexión con la base de datos');
          }
        } finally {
          if (user) {
            this.storage.setSession(user);
            this.router.navigate(['juegos']);
          } else {
            // Deshacer la creación del usuario en Firebase
            await this.authservice.deleteUser(result.user.uid);
          }
        }
      } else {
        this.alertservice.showErrorMessage('Los datos del formulario no son válidos');
      }
    }
    
    
}
