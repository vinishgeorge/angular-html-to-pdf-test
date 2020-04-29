import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  @ViewChild('content') content: ElementRef;

  makePdf() { 
    //let doc = new jsPDF();
    /*doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });*/

    html2canvas(document.body).then(canvas => {

      let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      let imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

  });
  }
}
