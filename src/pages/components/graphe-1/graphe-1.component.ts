import { Component, Input, OnChanges } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  responsive: ApexResponsive[];
  title?: ApexTitleSubtitle; 
};

@Component({
  selector: 'app-graphe-1',
  imports:[NgApexchartsModule],
  templateUrl: './graphe-1.component.html',
  styleUrls: ['./graphe-1.component.css']
})
export class Graphe1Component implements OnChanges {
  @Input() series: number[] = [];
  @Input() labels: string[] = [];

  

  chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: { type: 'donut', height: 420, width: '100%' },
    labels: [],
    colors: ['#1C64F2', '#16BDCA', '#9061F9', '#6ab37aff'],
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 }, legend: { position: 'bottom' } }
      }
    ],
    title: {
    text: "Prestations par type validé",
    align: "center",
    margin: 10,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "16px",
      color: "#000"
    } }as ApexTitleSubtitle,
    
  };

   ngOnChanges(): void {
    if (this.series?.length && this.labels?.length) {
    // ⚡ Toujours garantir que les @Input() ne sont jamais undefined
    this.chartOptions.series = this.series ?? [];
    this.chartOptions.labels = this.labels ?? [];
    this.chartOptions.colors = this.chartOptions.colors ?? ['#1C64F2', '#16BDCA', '#9061F9', '#6ab37aff'];
    this.chartOptions.chart = this.chartOptions.chart ?? { type: 'donut', height: 420, width: '100%'}
  }
     };
  
}
