import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstructionSenderService } from './requests/instructionsPost/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { FormControl, FormGroup, Validators } from '@angular/forms/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [InstructionSenderService],
})
export class AppComponent implements OnInit {
  img:File | string = "";
  displayImagePath:path = new path();
  dropAreaHighlight:boolean = false;
  imageFieldBlank:boolean = false;
  formats = [{viewValue: "A0", value: "A0", maxColNum: 2},{viewValue: "A1", value: "A1", maxColNum: 3},{viewValue: "A2", value: "A2", maxColNum: 5},{viewValue: "A3", value: "A3", maxColNum: 8},{viewValue: "A4", value: "A4", maxColNum: 10},{viewValue: "A5", value: "A5", maxColNum: 15},{viewValue: "A6", value: "A6", maxColNum: 20}]
  selectedFormat:string | undefined = "A4";
  sliceForm: FormGroup = new FormGroup({});
  // Format that user select
  public get SelectedFormat() {
    return this.selectedFormat;
  }
  public set SelectedFormat(val:string|undefined) {
    this.SetMaxColumns(this.formats.find(ar=>ar.value==val)?.maxColNum);
    if (this.selectedColNumber > this.maxColomnNumber.length) this.selectedColNumber = this.maxColomnNumber.length-1;
    this.selectedFormat = this.formats.find(ar=>ar.value==val)?.value;
  }

  // 
  ngOnInit(): void {
    this.sliceForm = new FormGroup({
      type: new FormControl(this.selectedFormat , [Validators.required]),
      colNumber: new FormControl(this.selectedColNumber , [Validators.required]),
      orientation: new FormControl (this.selectedOrientation , [Validators.required])
    });
  }
  selectedColNumber:number = 1;
  maxColomnNumber = new Array(this.formats[5].maxColNum);  
  defaultColomnNumber:number = 1;
  selectedOrientation:string = "portrait";
  // Display on page users selected image 
  OnFileSelected(event:any, type:string = "manual") {
    this.imageFieldBlank = false;
    let ab = this.displayImagePath;
    if (type =="drag") this.img = <File>event.dataTransfer.files[0];
    else this.img = <File>event.files[0];
    if(!this.img.type.startsWith('image')) {
      alert("Incorrect file type! Accept only image format type");
      return;
    }
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
    this.OnFileSelected(e, "drag");
  }

  UploadFile(event:Event) {
    event.preventDefault();
    if (this.img=="") {this.imageFieldBlank =true; return;}
    if (this.sliceForm?.invalid) return;
    let formData = new FormData();
    formData.append('type', ''+this.img);
    formData.append('type', ''+this.sliceForm?.get('type')?.value);
    formData.append('colNum',''+this.sliceForm?.get('colNumber')?.value);
    formData.append('orientation', ''+(this.sliceForm?.get('orientation')?.value)+1);
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
}


class path {
  str:string|ArrayBuffer|null="";
}
