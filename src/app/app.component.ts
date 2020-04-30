import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 
import domtoimage from 'dom-to-image';
import { ExportService } from './export.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  @ViewChild('content') content: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(private readonly exportService:ExportService){}

  makePdf() { 
    // let doc = new jsPDF();
    // doc.addHTML(document.body, {
    //     scrollX: 0,
    //     scrollY: 0
    //   }, function() {
    //    doc.save("obrz.pdf");
    // });

let node = this.content.nativeElement;

domtoimage.toPng(node)
    .then(function (dataUrl) {
        //call api to send image to be added to pdf.
        this.exportService.exportToPDF().subscribe(data => {
     alert("Generated");
    });
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    //document.body
  //   document.getElementById("timeline").scrollIntoView();
  //    html2canvas(document.getElementById("timeline"),{
  //       scrollX: 0,
  //       scrollY: 0
  //     }).then(canvas => {
  //      console.log(canvas.clientWidth,canvas.clientHeight);
  //      console.log(canvas.width,canvas.height);
  //      let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
  //     let imgData  = canvas.toDataURL("image/jpeg", 1.0);
  //      this.img.nativeElement.src=imgData;
  //      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
  //      pdf.save('converteddoc.pdf');
  // });
  // let c = document.getElementById("timeline");
  //   // overwrite owner doc inner height with your div clientHeight
  //    const body = document.createElement('body');
  //               body.appendChild(c);
  //               const newIframe = document.createElement('iframe');
  //               this.img.nativeElement.appendChild(newIframe);
  //               newIframe.contentWindow.document.write(body.innerHTML);
  //              // console.log(newIframe.contentWindow.document.body);
  // html2canvas(newIframe.contentWindow.document.body).then(canvas => {
  //       console.log(canvas.clientWidth,canvas.clientHeight);
  //      console.log(canvas.width,canvas.height);
  //               let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
  //               let imgData  = canvas.toDataURL("image/jpeg", 1.0);
  //               this.img.nativeElement.src=imgData;
  //               pdf.addImage(imgData,0,0,canvas.width, canvas.height);
  //               pdf.save('converteddoc.pdf');          
  //               newIframe.contentWindow.document.close();
  //               this.img.nativeElement.innerHTML = '';
               
               
  //           });
  }

   printImage(url: string): void {
    const body = document.createElement('body');
    const img = document.createElement('img');
    img.setAttribute('src', url);
    body.appendChild(img);

    const newIframe = document.createElement('iframe');
    this.img.nativeElement.appendChild(newIframe);

    newIframe.contentWindow.document.write(body.innerHTML);
    newIframe.contentWindow.document.close();
    this.img.nativeElement.innerHTML = '';
  }
}
