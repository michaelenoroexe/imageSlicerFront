import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructionSenderService {
  baseUrl:string ="";
  res:string = "";
  constructor (private http: HttpClient) {}
  //constructor(/*private http: HttpClient, file:FormData*/) {
    // http.post("https://localhost:7131/api/slice", file, {
    //   headers: {
    //     "Content-Type": "multipart/form-data; boundary=something"
    //   }
    // }).subscribe(result => {
    //     console.log(result);
    //   }, error => console.error(error));
    // http.get("https://localhost:7131/api/slice").subscribe(result => {
    //   console.log(result);
    // }, error => console.error(error));
  //}
  //Send image to server
   PostInst(file:FormData){
     return this.http.post("https://localhost:7272/api/slice", file); 
   }
}
  
  
