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
}
