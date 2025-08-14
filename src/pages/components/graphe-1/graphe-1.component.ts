import { AfterViewInit, Component } from '@angular/core';

import ApexCharts from 'apexcharts'; // tu dois avoir installé apexcharts

@Component({
  selector: 'app-graphe-1',
  imports: [],
  templateUrl: './graphe-1.component.html',
  styleUrl: './graphe-1.component.css'
})
export class Graphe1Component  implements AfterViewInit{

  ngAfterViewInit(): void {
    const chart = new ApexCharts(
      document.querySelector("#pie-chart"),
      this.getChartOptions()
    );
    chart.render();
  }

   getChartOptions() {
    return {
      series: [52.8, 26.8, 20.4,6],
      colors: ["#1C64F2", "#16BDCA", "#9061F9","#6ab37aff"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
      },
      plotOptions: {
        pie: {
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Direct", "Organic search", "Referrals"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value + "%";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: number) {
            return value + "%";
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  }



}
