import { Injectable } from '@angular/core';

//apollo graphql
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo:Apollo) { }
   // graphql respuesta 'variable'.data.'nombreFuncion'.
   private queryGQL(query,variables?){
    return this.apollo
      .watchQuery<any>({
        query:query,
        variables:variables
      })
      .valueChanges
  }
  private mutacionGQL(query,variables?,context?){
    return this.apollo
      .mutate<any>({
        mutation:query,
        variables:variables,
        context:context
        
      })
      
  }
  //graphql
  usuarios(cant:Number,dataRequest:String,page?:Number){
      let   query= gql`
        query ($num:Int!,$page:Int){
          users(first:$num,page:$page){
            data {
              ${dataRequest}
            }
          }
        }
      `
      return this.queryGQL(query,{num:cant,page:page})
      
  }
  login(username:String,password:String){
    let query=gql`mutation ($log:String!,$pass:String!) {
        login(input:{
          username:$log,
          password:$pass
        }){
          access_token token_type
          user{
            id nombre_completo
          }
        }
      }`
    let variables={
      log:username,pass:password
    }
    return this.mutacionGQL(query,variables)
  }
  upload(file){
    let query=gql`mutation($file: Upload!) {
      upload(file: $file)
    }`
    return this.mutacionGQL(query,{file:file},{hasUpload: true})
  }
  register(data:{
    nombre_completo:String
    email:String
    password:String
    password_confirmation:String
    peso:number
    altura:number
    telefono:String
    genero:string
    fecha_nacimiento:string
  }){
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
        nombre_completo:$nombre_completo,
        email:$email,
        password:$password,
        password_confirmation:$password_confirmation,
      	telefono:$telefono,
        peso:$peso,
        altura:$altura,
        genero:$genero,
        fecha_nacimiento:$fecha_nacimiento
      }){
        access_token
        user{
          id nombre_completo fecha_nacimiento
        }
      }
    }`

  return this.mutacionGQL(query,data)
  }
}
