import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstructionSenderService } from './requests/instructionsPost/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [InstructionSenderService],
})
export class AppComponent {
  img:File | string = "";
  displayImagePath:path = new path();
  recievedImage:path = new path();
  dropAreaHighlight:boolean = false;
  formats = [{viewValue: "A0", value: "A0", maxColNum: 2},{viewValue: "A1", value: "A1", maxColNum: 3},{viewValue: "A2", value: "A2", maxColNum: 5},{viewValue: "A3", value: "A3", maxColNum: 8},{viewValue: "A4", value: "A4", maxColNum: 10},{viewValue: "A5", value: "A5", maxColNum: 15},{viewValue: "A6", value: "A6", maxColNum: 20}]
  selectedFormat:string | undefined = "A4";
  // Format that user select
  public get SelectedFormat() {
    return this.selectedFormat;
  }
  public set SelectedFormat(val:string|undefined) {
    this.SetMaxColumns(this.formats.find(ar=>ar.value==val)?.maxColNum);
    this.selectedFormat = this.formats.find(ar=>ar.value==val)?.value;
  }
  selectedColNumber:number = 1;
  maxColomnNumber = new Array(this.formats[5].maxColNum);  
  defaultColomnNumber:number = 1;
  selectedOrientation:string = "portrait";
  // Display on page users selected image 
  OnFileSelected(event:any) {
    let ab = this.displayImagePath;
    this.img = <File>event.dataTransfer.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onload = function() {
      ab.str = reader.result;
    };
    reader.onerror = function() {
    };
  }
  //  Set max column number to format
  SetMaxColumns(num:number|undefined) {
    this.maxColomnNumber = Array(num);
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

  UploadFile(event:Event) {
    event.preventDefault();
    let formData = new FormData();
    let arbRef = this.recievedImage;
    formData.append('file', this.img);
    formData.append('type', ''+this.selectedFormat);
    formData.append('colNum',''+(this.selectedColNumber+1));
    formData.append('orientation', this.selectedOrientation);
    let ar = this.instrSendeService.PostInst(formData);
    ar.subscribe (response=>
      {
        let blob:Blob = response.body as Blob;
        console.log(blob);
        let a = document.createElement('a');
        a.download='Poster.pdf'
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    )
  }
  constructor (private instrSendeService:InstructionSenderService) {}
    //constructor ( private http: HttpClient) { }
}


class path {
  str:string|ArrayBuffer|null="";
}
