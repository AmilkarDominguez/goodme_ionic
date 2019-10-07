import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client'
import { BatchHttpLink } from "apollo-link-batch-http";

let healders=  new HttpHeaders({
    "Authorization":localStorage.getItem("tokenAuth")?localStorage.getItem("tokenAuth"):"",
})
const httpOptions = {
  uri: 'http://192.168.1.15:8000/graphql',
  headers:healders
}
const httpOptionsupload = {
  uri: 'http://192.168.1.15:8000/graphql'
}

const httpLinkupload = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(httpOptionsupload),
  new BatchHttpLink(httpOptionsupload)
)
const link=(httpLink: HttpLink) => {
  return {
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      ApolloLink.split(
        operation => operation.getContext().hasUpload,
        createUploadLink(httpOptionsupload),
        httpLink.create(httpOptions)
      )
    ])
  }
}
@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
        provide: APOLLO_OPTIONS,
        useFactory: link,
        deps: [HttpLink]
      }
  ],
})

export class GraphQLModule {}