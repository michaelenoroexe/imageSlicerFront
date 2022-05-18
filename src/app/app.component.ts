import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstructionSenderService } from './requests/instructionsPost/post.service'
import { Byte } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [InstructionSenderService],
})
export class AppComponent {
  img:any;
  displayImagePath:path = new path();
  recievedImage:path = new path();
  dropAreaHighlight:boolean = false;
  OnFileSelected(event:any) {
    let ab = this.displayImagePath;
    let ia = <File>event.dataTransfer.files[0];
    this.UploadFile(ia);
    let reader = new FileReader();
    reader.readAsDataURL(ia);
    reader.onload = function() {
      ab.str = reader.result;
    };
    reader.onerror = function() {
    };
}
// Prevent opening file in browser
PreventDefaults (e:Event) {
  e.preventDefault();
  e.stopPropagation();
}
// Highlighting area when file in correct area
Highlight() {
  this.dropAreaHighlight = true;
}
Unhighlight() {
  this.dropAreaHighlight = false;
}
HandleDrop(e:any) {
  this.OnFileSelected(e);
}

UploadFile(file:File) {
  let formData = new FormData();
  let arbRef = this.recievedImage;
  formData.append('file', file);
  formData.append('type', 'A4');
  formData.append('colNum', '3');
  formData.append('orientation', 'landscape');
  let ar = this.instrSendeService.PostInst(formData);
  console.log(ar);
  ar.subscribe ({
    next(value:any) {
      const blob = new Blob(value, {type: 'image/*'});
      let reader = new FileReader();
      let fil:File = value;
      console.log(fil);
      reader.readAsDataURL(blob);
      reader.onload = function() {
        arbRef.str = reader.result;
      };
      reader.onerror = function() {
      };
    },
    error(err) {
      console.log(err)
    },
    complete() {
      console.log()
    },
  })
}
constructor (private instrSendeService:InstructionSenderService) {}
  //constructor ( private http: HttpClient) { }
}


class path {
  str:string|ArrayBuffer|null="";
}
