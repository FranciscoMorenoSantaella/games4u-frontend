import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  game:any;
  constructor(public router:Router, public angularfirestore: AngularFirestore, // Inject Firestore service
    public auth: AngularFireAuth,public userservice:UserService) { }


  getCurrentUser():any{
    if(localStorage.getItem('user')){
      return this.game = localStorage.getItem('user') as any;
    }else{
       localStorage.removeItem('user');
    }
  }

  async signUp(email:string, password:string):Promise<any>{
    if(email !=null && password !=null){
      try {
        let result = this.auth.createUserWithEmailAndPassword(email,password);
        return result;
      } catch (error) {
        
      }
    }
  }

   /**
   * Metodo de inicio de sesion en firebase
   * @param email es el email del usuario con el que queremos inciar sesion
   * @param password es la contraseña del usuario con la que queremos iniciar sesion
   * @returns devuelve firebase.auth.credential
   */
   async signIn(email: string, password: string): Promise<any> {
    if (email != null && password != null) {
      try {
        let result = await this.auth.signInWithEmailAndPassword(email, password);
        return result;
      } catch (error:any) {
        if (error.code === 'auth/user-not-found') {
          throw new Error('El correo electrónico no existe');
        } else if (error.code === 'auth/wrong-password') {
          throw new Error('Contraseña incorrecta');
        } else if (error.code === 'auth/too-many-requests') {
          throw new Error('Demasiados intentos de inicio de sesión. Por favor, inténtalo más tarde');
        } else {
          throw new Error('No se pudo iniciar sesión con el correo y contraseña proporcionados');
        }
      }
    }
  }
  
  
  async deleteUser(uid: string): Promise<void> {
    try {
      await firebase.auth().currentUser?.delete();
    } catch (error) {
      console.error('Error al eliminar el usuario de Firebase:', error);
      throw error;
    }
  }
}
