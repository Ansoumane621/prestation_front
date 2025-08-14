import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pi',
  imports: [CommonModule, RouterModule],
  templateUrl: './pi.component.html',
  styleUrl: './pi.component.css'
})
export class PiComponent {
  private route = inject(ActivatedRoute)
  

   demandes: any[] = [
  { nom: 'Fatoumata Condé', matricule: 'RET12345', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'saran Diallo', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou keita', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou mouna', matricule: 'RET12346', dateDemande: new Date() },
  { nom: 'Mamadou bah', matricule: 'RET12346', dateDemande: new Date() },
  // Ajoute autant que nécessaire...
];

demandesAffichees: any[] = [];
page = 1;
pageSize = 5;

get totalPages(): number {
  return Math.ceil(this.demandes.length / this.pageSize);
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}


ngOnInit() {
  this.changePage(1);
  this.route.paramMap.subscribe(params => {
    const valeur = params.get('value');
    console.log('Valeur reçue :', valeur);
    // exécuter ta requête ici
  });
}

changePage(page: number) {
  this.page = page;
  const start = (page - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.demandesAffichees = this.demandes.slice(start, end);
}

voirDocuments(demande: any) {
  console.log("📁 Voir documents pour :", demande);
  // Affiche dans un modal si tu veux
}

validerDemande(id: number) {
  console.log("✅ Demande validée :", id);
  // Traite ici
}

}
