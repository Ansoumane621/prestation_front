import { Component, inject, OnInit } from '@angular/core';
import { CardDashbordComponent } from "../components/card-dashbord/card-dashbord.component";
import { Graphe1Component } from "../components/graphe-1/graphe-1.component";
import { Graphe2Component } from "../components/graphe-2/graphe-2.component";
import { RetraiteService } from '../../app/retraite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-dashbord',
  imports: [CardDashbordComponent, Graphe1Component, CommonModule, Graphe2Component],
  templateUrl: './content-dashbord.component.html',
  styleUrl: './content-dashbord.component.css'
})
export class ContentDashbordComponent implements OnInit {
  private service = inject(RetraiteService)
  retraite:string="Retraite"
  reversion:string="SCD"
  pto:string="PTO"
  pi:string="PI"
  pi_nb: number = 0;
retraite_nb: number = 0;
pto_nb: number = 0;
reversion_nb: number = 0;
chartSeries: number[] = [];
  chartLabels: string[] = [];
  dataLoaded: boolean = false; // nouveau

ngOnInit() {
  this.service.counter_by_type().subscribe({
  next: (res) => {
    // Valeurs par défaut
      const defaultData: { [key: string]: number } = {
        pi: 0,
        retraite: 0,
        pto: 0,
        reversion: 0
      };

      // Remplacer uniquement si trouvé dans la réponse
      res.forEach(item => {
        if (defaultData.hasOwnProperty(item.type_retraite)) {
          defaultData[item.type_retraite] = item.count;
        }
      });

      // Maintenant tu mets à jour tes variables
      this.pi_nb = defaultData['pi'];
      this.retraite_nb = defaultData['retraite'];
      this.pto_nb = defaultData['pto'];
      this.reversion_nb = defaultData['reversion'];

      // Construire chartSeries & chartLabels à partir des valeurs finales
      this.chartLabels = Object.keys(defaultData);   // ["pi","retraite","pto","reversion"]
      this.chartSeries = Object.values(defaultData); // [valeurs correspondantes]
      this.dataLoaded = true; // signal que les données sont prêtes

    res.forEach(item => {
      switch (item.type_retraite) {
        case "pi":
          this.pi_nb = item.count;
          break;
        case "retraite":
          this.retraite_nb = item.count;
          break;
        case "pto":
          this.pto_nb = item.count;
          break;
        case "reversion":
          this.reversion_nb = item.count;
          break;
      }
    });
  },
  error: (err) => {
    console.log(err);
  }
});

}



}
