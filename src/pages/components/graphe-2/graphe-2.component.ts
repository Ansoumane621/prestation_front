import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-graphe-2',
  imports: [],
  templateUrl: './graphe-2.component.html',
  styleUrl: './graphe-2.component.css',
})
export class Graphe2Component implements AfterViewInit {
  ngAfterViewInit(): void {
    const chart = new ApexCharts(
      document.querySelector('#bar-chart'),
      this.getChartOptions()
    );
    chart.render();
  }

  getChartOptions() {
    return {
      series: [
        {
          name: 'Pourcentage',
          data: [52.8, 26.8, 20.4,6],
        },
      ],
      chart: {
        height: 420,
        width: '100%',
        type: 'bar',
      },
      colors: ['#16BDCA', '#9061F9', '#1C64F2'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + '%';
        },
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      xaxis: {
        categories: ['Direct', 'Organic search', 'Referrals'],
        labels: {
          style: {
            fontFamily: 'Inter, sans-serif',
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value + '%';
          },
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
      },
    };
  }
}
