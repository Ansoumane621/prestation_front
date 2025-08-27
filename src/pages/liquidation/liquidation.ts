import { Component, OnInit } from '@angular/core';
import { RetraiteService } from '../../app/retraite.service';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-liquidation',
  standalone:true,
  imports: [DecimalPipe,RouterModule],
  templateUrl: './liquidation.html',
  styleUrl: './liquidation.css'
})
export class Liquidation implements OnInit{

   employeId: string = "98721"; // tu peux la passer dynamiquement
  data: any;  // contient toute la réponse API
  loading: boolean = false;
  error: string | null = null;
  id!: string;

  constructor(private liquidationService: RetraiteService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getLiquidation();
  }

  getLiquidation() {
    this.loading = true;
    this.error = null;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.liquidationService.faire_liquidation(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur :", err.message);
        this.error = "Impossible de charger la liquidation.";
        this.loading = false;
      }
    });
  }


}
