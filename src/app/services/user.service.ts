import { Injectable } from '@angular/core';

//apollo graphql
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, LoginInput, AuthPayload, UserPaginator } from '../models/models';
import { Observable, FetchResult } from 'apollo-link';

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
    return this.apollo
      .watchQuery<{users:UserPaginator}>({
        query:query,
        variables:{num:cant,page:page}
      })
      .valueChanges
      
  }

  upload(file){
    let query=gql`mutation($file: Upload!) {
      upload(file: $file)
    }`
    return this.apollo.mutate<any>({
      mutation:query,
      variables:{file:file},
      context:{hasUpload: true}
    })
  }

}
