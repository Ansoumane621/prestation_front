import { Component } from '@angular/core';
import { CardDashbordComponent } from "../components/card-dashbord/card-dashbord.component";
import { Graphe1Component } from "../components/graphe-1/graphe-1.component";
import { Graphe2Component } from "../components/graphe-2/graphe-2.component";

@Component({
  selector: 'app-content-dashbord',
  imports: [CardDashbordComponent, Graphe1Component, Graphe2Component],
  templateUrl: './content-dashbord.component.html',
  styleUrl: './content-dashbord.component.css'
})
export class ContentDashbordComponent {
  retraite:string="Retraite"
  reversion:string="Reversion"
  pto:string="PTO"
  pi:string="PI"
  pi_nb:number=18
  retraite_nb:number=4
  pto_nb:number=5
  reversion_nb:number=3

}
