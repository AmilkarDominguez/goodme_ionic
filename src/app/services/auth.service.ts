import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { LoginInput, AuthPayload, User } from '../models/models';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private router: Router,
    private toastController: ToastController,
    private apollo:Apollo
  ) { }
    /**
     * 
     login(email: String, password: String) {
       return this.http.post(this.env.API_URL + 'auth/login',
         {email: email, password: password}
       ).pipe(
         tap(token => {
           this.storage.setItem('token', token)
           .then(
             () => {
               console.log('Token Almacenado');
             },
             error => console.error('Error al guardar item', error)
           );
           this.token = token;
           this.isLoggedIn = true;
           return token;
         }),
       );
     }
   
     register(nombre_completo: String, email: String, password: String) {
       return this.http.post(this.env.API_URL + 'auth/register',
         {nombre_completo: nombre_completo, email: email, password: password}
       )
     }
   
     */
       logout() {
         const headers = new HttpHeaders({
           'Authorization': this.token["token_type"]+" "+this.token["access_token"]
         });
     
         return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
         .pipe(
           tap(data => {
             this.storage.remove("token");
             this.isLoggedIn = false;
             delete this.token;
             return data;
           })
         )
       }
    login(data:LoginInput){
      let query=gql`mutation ($username:String!,$password:String!) {
          login(input:{
            username:$username,
            password:$password
          }){
            access_token token_type
            user{
              id nombre_completo
            }
          }
        }`
      return this.apollo.mutate<{login:AuthPayload}>({
        mutation:query,
        variables:data
      })
    }
    register(data:User){
      console.log(data)
      let query=gql`mutation(
        $nombre_completo:String!,
        $email:String!,
        $password:String!,
        $password_confirmation:String!,
        $peso:Int!,
        $altura:Int!,
        $telefono:String!,
        $genero:Genero!,
        $fecha_nacimiento:Date!
      ){
        register(input:{
          nombre_completo: $nombre_completo
          email: $email
          password: $password
          password_confirmation: $password_confirmation
          fecha_nacimiento:$fecha_nacimiento 
          peso:$peso 
          altura:$altura
          genero:$genero 
          telefono:$telefono
        }){
          access_token
          user{
            id nombre_completo fecha_nacimiento
          }
        }
      }`
  
    return this.apollo.mutate<{register:AuthPayload}>({
      mutation:query,
      variables:data
    })
    }
 

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}

