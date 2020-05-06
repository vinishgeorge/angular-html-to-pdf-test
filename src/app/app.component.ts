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


  constructor(private readonly exportService:ExportService){}

  makePdf() { 
    const filterClassName:string=" deleteImg ";

let node = this.content.nativeElement;
let  div:HTMLDivElement=this.cloneDiv(this.content.nativeElement.innerHTML);
function filter (element) {
  var className = " " + className + " ";
  return   !( (" " + element.className + " ").replace(/[\n\t\r]/g, " ").indexOf(filterClassName) > -1 );
}
domtoimage.toPng(div,{filter:filter})
    .then(imgData=> {

      //console.log(imgData)
     
     // imgData= this.rotateBase64Image90deg(imgData,true);
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

    
  }

   cloneDiv(innerHTML:string) {
    let div=document.createElement('div');
    div.style.height="1000px";
    div.style.width="1000px";
    div.style.overflow="auto";
    div.innerHTML=innerHTML;
    div.id = "image_temp_div";
    document.body.appendChild(div)
    return div;
    ;
  }

  rotateBase64Image90deg(base64Image, isClockwise) {
    // create an off-screen canvas
    let offScreenCanvas = document.createElement('canvas');
    let offScreenCanvasCtx = offScreenCanvas.getContext('2d');

    // cteate Image
    let img = new Image();
    img.src = base64Image;

    // set its dimension to rotated size
    offScreenCanvas.height = 1000;
    offScreenCanvas.width = 1000;

    // rotate and draw source image into the off-screen canvas:
    if (isClockwise) { 
        offScreenCanvasCtx.rotate(90 * Math.PI / 180);
        offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
        offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
        offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }
    offScreenCanvasCtx.drawImage(img, 0, 0);

    // encode image to data-uri with base64
    return offScreenCanvas.toDataURL("image/png", 100);
}
}
