import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
export class PieChart {
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend: boolean;
  pieChartPlugins?: any[];
  pieChartColors?: any[];
  pieChartOptions: ChartOptions;
}

export class BarChart {
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean;
  barChartPlugins?: any[];
  barChartData: any[];
  barChartOptions: ChartOptions;
  barChartColors?: any[];
}
