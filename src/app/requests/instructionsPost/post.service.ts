import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructionSenderService {
  baseUrl:string ="";
  res:string = "";
  constructor (private http: HttpClient) {}
  //Send image to server
   PostInst(file:FormData){
     return this.http.post("https://localhost:7272/api/slice", file,
      {observe:'response', responseType:"blob"}); 
   }
}
