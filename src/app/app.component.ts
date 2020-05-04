import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import domtoimage from 'dom-to-image';

import { ExportService } from './export.service';
import html2canvas from 'html2canvas';
import { getFileNameFromResponseContentDisposition, saveFile } from './file-download-helper';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  @ViewChild('content') content: ElementRef;
  @ViewChild('img') img: ElementRef;
  @ViewChild('divElement') divElement: ElementRef;
  constructor(private readonly exportService:ExportService){}

  makePdf() { 
   

let node = this.content.nativeElement;
let  div:HTMLDivElement=this.cloneDiv(this.content.nativeElement.innerHTML);
domtoimage.toPng(div)
    .then(imgData=> {

      //console.log(imgData)
      

      this.exportService.exportToPDF(imgData).subscribe(
              response => {
               const fileName = getFileNameFromResponseContentDisposition(response);
               saveFile(response.body, fileName);
               div.remove();
            },error=>{
              div.remove();
            });
      
        //call api to send image to be added to pdf.
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    //document.body
  //   this.content.nativeElement.scrollIntoView();
  //    html2canvas(this.content.nativeElement,{
  //       scrollX: 0,
  //       scrollY: 0
  //     }).then(canvas => {
  //     let imgData  = canvas.toDataURL("image/jpeg", 1.0);

  //      this.exportService.exportToPDF(imgData).subscribe(
  //       response => {
  //        const fileName = getFileNameFromResponseContentDisposition(response);
  //        saveFile(response.body, fileName);
  //     });
  // });
  }

   cloneDiv(innerHTML:string) {
    let div=document.createElement('div');
    div.style.height="1000px";
    div.style.width="1000px";
    div.style.overflow="auto";
    div.innerHTML=innerHTML;
    div.id = "image_temp_div";
    document.body.appendChild(div)
    //this.divElement.nativeElement.innerHTML=innerHTML;
    //this.divElement.nativeElement.innerHTML = '';
    return div;
    ;
  }
}
