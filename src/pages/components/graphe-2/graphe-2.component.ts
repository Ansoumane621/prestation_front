import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexLegend,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { RetraiteService } from '../../../app/retraite.service';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;   // ✅ on précise bien que c’est un AxisChart
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-graphe-2',
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './graphe-2.component.html',
  styleUrl: './graphe-2.component.css',
})
export class Graphe2Component implements AfterViewInit {
   public series: ApexAxisChartSeries = [];
  public chart: ApexChart = { type: 'line', height: 350 };
  public xaxis: ApexXAxis = { categories: [] };
  public yaxis: ApexYAxis | ApexYAxis[] = [];
  public stroke: ApexStroke = { width: [0, 4] };
  public tooltip: ApexTooltip = { shared: true, intersect: false };
  public legend: ApexLegend = { position: 'top' };
  public title: ApexTitleSubtitle = { text: 'Top 5 pensionnés les mieux payés' };

  public dataLoaded = false; // pour *ngIf

  constructor(private liquitationService: RetraiteService) {}

  ngAfterViewInit(): void {
    this.loadTop5();
  }

  loadTop5(): void {
    this.liquitationService.getTop5().subscribe((data) => {
      console.log(data)
      // recréer complètement les objets pour forcer Angular à détecter le changement
      this.series = [
        {
          name: 'Montant Pension (MMP)',
          type: 'column',
          data: data.map((item) => item.MMP)
        },
        {
          name: 'Salaire Cotisé (SSC)',
          type: 'line',
          data: data.map((item) => item.SSC)
        }
      ];

      this.xaxis = {
        categories: data.map((item) => item.employeur) // raison sociale
      };

      this.yaxis = [
        {
          title: { text: 'Montant Pension (MMP)' }
        },
        {
          opposite: true,
          title: { text: 'Salaire Cotisé (SSC)' }
        }
      ];

      this.dataLoaded = true; // permet de rendre le chart avec *ngIf
    });
  }
    
}
