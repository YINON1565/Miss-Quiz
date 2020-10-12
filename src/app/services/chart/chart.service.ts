import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  public getChart(
    title: string,
    columnNames: string[],
    data: (string | number)[][],
    type: string,
    vAxisTitle: string = '',
    hAxisTitle: string = '',
    min?: number,
    max?: number,
    chartTypes: string[] = [
      'AreaChart',
      'LineChart',
      'ColumnChart',
      'ScatterChart',
      'SteppedAreaChart',
    ],
    backgroundColor: { fill: string; fillOpacity: number } = {
      fill: '#000',
      fillOpacity: 0.05,
    },
    colors: string[] = ['#fff'],
    isHtml: boolean = true,
    is3D: boolean = true,
    legend: string = 'none',
    animation: { duration: number; easing: string; startup: boolean } = {
      duration: 1000,
      easing: 'liner',
      startup: true,
    }
  ) {
    return {
      chartTypes,
      type,
      data,
      columnNames,
      options: {
        tooltip: { isHtml },
        vAxis: {
          title: vAxisTitle,
          titleTextStyle: { fontSize: 18 },
        },
        hAxis: {
          title: hAxisTitle,
          titleTextStyle: { fontSize: 18 },
        },
        min,
        max,
        colors,
        backgroundColor,
        title,
        is3D,
        slices: [
          { color: '#378ac5' },
          { color: '#125e94' },
          { color: '#7dbae6' },
        ],
        legend,
        animation,
      },
    };
  }
}
