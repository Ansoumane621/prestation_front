import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-pdf-view',
  imports: [PdfViewerModule,CommonModule],
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent {

   // Liste de PDF en local
  pdfList: string[] = [
  '/doc1.pdf',
  '/doc2.pdf',
];


  // zoom par document (optionnel, si tu veux contrôler chaque zoom)
  zoomLevels: number[] = [1, 1, 1];

  zoomIn(index: number) {
    this.zoomLevels[index] += 0.1;
  }

  zoomOut(index: number) {
    if (this.zoomLevels[index] > 0.2) {
      this.zoomLevels[index] -= 0.1;
    }
  }

}
