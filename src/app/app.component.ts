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
  formats = [{viewValue: "A0", value: "A0", maxColNum: 4},{viewValue: "A1", value: "A1", maxColNum: 6},{viewValue: "A2", value: "A2", maxColNum: 8},{viewValue: "A3", value: "A3", maxColNum: 12},{viewValue: "A4", value: "A4", maxColNum: 17},{viewValue: "A5", value: "A5", maxColNum: 24},{viewValue: "A6", value: "A6", maxColNum: 30}]
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
  selectedColNumber:number = 1;
  maxColomnNumber = new Array(this.formats[4].maxColNum);  
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
  ngOnInit(): void {
    this.sliceForm = new FormGroup({
      type: new FormControl(this.selectedFormat , [Validators.required]),
      colNumber: new FormControl(this.selectedColNumber , [Validators.required]),
      orientation: new FormControl (this.selectedOrientation , [Validators.required])
    });
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
  HandleDrop(e:any, disabled:boolean) {
    if (disabled) return;
    this.OnFileSelected(e, "drag");
  }

  UploadFile(event:Event) {
    event.preventDefault();
    if (this.img=="") {this.imageFieldBlank =true; return;}
    if (this.sliceForm?.invalid) return;
    let formData = new FormData();
    console.log(this.img);
    formData.append('file', this.img);
    formData.append('type', ''+this.sliceForm?.get('type')?.value);
    formData.append('colNum',(1+this.sliceForm?.get('colNumber')?.value)+'');
    formData.append('orientation', ''+this.sliceForm?.get('orientation')?.value);
    let ar = this.instrSendeService.PostInst(formData);
    let slForm = this.sliceForm;
    slForm.disable();
    ar.subscribe ({
      next(value) {
        let blob:Blob = value.body as Blob;
        console.log(blob);
        let a = document.createElement('a');
        a.download='Poster.pdf'
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error(err) {
        slForm.enable();
      },
    }
    )
  }
  constructor (private instrSendeService:InstructionSenderService) {}
}


class path {
  str:string|ArrayBuffer|null="";
}
