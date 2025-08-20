import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RetraiteService } from '../../../app/retraite.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-content',
  imports: [CommonModule,RouterModule,NgIf],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

demandes: any[] = [];
demandesAffichees: any[] = [];


page = 1;
pageSize = 5;
isLoading = true;

get totalPages(): number {
  return Math.ceil(this.demandes.length / this.pageSize);
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

private service = inject(RetraiteService)
private router = inject(Router)
private route = inject(ActivatedRoute)
  ngOnInit() {
  this.isLoading = true;

  this.route.paramMap.subscribe(params => {
    const retraite = params.get('value'); // récupère "retraite" ou autre depuis l'URL
    this.service.get_retraite_type(retraite!).subscribe({
      next: (res: any) => {
        this.demandes = res;
        console.log(res)
        this.changePage();
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  });
}


changePage(page: number = 1) {
  this.page = page;
  const start = (page - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.demandesAffichees = this.demandes.slice(start, end);
}

goToDocuments(demande: any) {

  this.router.navigate([`/dashbord/documents/`], {
    state: {
      phone: demande.phone,
      employe: demande// deuxième variable
    }
  });
}

}
