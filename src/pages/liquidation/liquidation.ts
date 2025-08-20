import { Component, OnInit } from '@angular/core';
import { RetraiteService } from '../../app/retraite.service';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-liquidation',
  imports: [DecimalPipe],
  templateUrl: './liquidation.html',
  styleUrl: './liquidation.css'
})
export class Liquidation implements OnInit{

   employeId: string = "98721"; // tu peux la passer dynamiquement
  data: any;  // contient toute la réponse API
  loading: boolean = false;
  error: string | null = null;

  constructor(private liquidationService: RetraiteService) {}

  ngOnInit(): void {
    this.getLiquidation();
  }

  getLiquidation() {
    this.loading = true;
    this.error = null;

    this.liquidationService.faire_liquidation(this.employeId).subscribe({
      next: (res: any) => {
        console.log("Réponse API :", res['details_calcul']);
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.error = "Impossible de charger la liquidation.";
        this.loading = false;
      }
    });
  }


}
