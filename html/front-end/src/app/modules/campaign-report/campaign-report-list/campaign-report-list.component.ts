import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';
import { CampaignReportForm, CampaignReport, CampaignReportRequest } from '../../../@core/models/campaign.model';
import { Income } from '../../../@core/models/income.model';
import { Tracking } from '../../../@core/models/tracking.model';
import { CampaignService } from '../../../@core/services/campaign.service';
import * as Highcharts from 'highcharts';
import { isArrayHasData, toCapitalize, toLocalTime, toUTCTime, toUpperCase } from '../../../@core/common/ultis';
import * as moment from 'moment';
import { DataBuckets } from '../../../@core/models/bucket.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-report-list',
  templateUrl: './campaign-report-list.component.html',
  styleUrls: ['./campaign-report-list.component.scss']
})
export class CampaignReportListComponent extends AbstractBaseComponent implements OnInit {
  code: string;
  campaignReportForm: CampaignReportForm;
  isShowControl = true;
  campaignReport: CampaignReport;

  campaignCode: string;

  income: Income;
  tracking: Tracking;

  osHighcharts: typeof Highcharts = Highcharts;
  updateOs = false;
  osChartOptions: Highcharts.Options = {
    colors: ['#95CEFF', '#FF7599', '#af11d6', '#1138d6', '#1bd611'],
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    series: [{
      data: [],
      type: 'pie',
      colorByPoint: true,
      name: this.getValueFromKeyTranslate('body.home.campaign-report.tracking.os.name'),
    }],
    title: {
      text: this.getValueFromKeyTranslate('body.home.campaign-report.chart.pie-chart') +
        ' ' + this.getValueFromKeyTranslate('body.home.campaign-report.tracking.os.title'),
      style: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24px',
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver',
        },
      },
    },
  };

  ispHighChart: typeof Highcharts = Highcharts;
  updateIsp = false;
  ispChartOption: Highcharts.Options = {
    colors: ['#95CEFF', '#FF7599', '#af11d6', '#1138d6', '#1bd611'],
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    series: [{
      type: 'pie',
      data: [],
      name: this.getValueFromKeyTranslate('body.home.campaign-report.tracking.isp.name')
    }],
    title: {
      text: this.getValueFromKeyTranslate('body.home.campaign-report.chart.pie-chart') +
        ' ' + this.getValueFromKeyTranslate('body.home.campaign-report.tracking.isp.title'),
      style: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24px'
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver',
        },
      },
    },
  };

  incomeValueHightChart: typeof Highcharts = Highcharts;
  updateIncomeValue = false;
  incomeValueChartOption: Highcharts.Options = {
    colors: ['#95CEFF', '#FF7599', '#af11d6', '#1138d6', '#1bd611'],
    chart: {
      type: 'column',
    },
    title: {
      text: this.getValueFromKeyTranslate('body.home.campaign-report.chart.bar-chart') + ' '
        + this.getValueFromKeyTranslate('body.home.campaign-report.income.value'),
      style: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24px',
      }
    },
    series: [{
      data: [],
      type: 'column',
      name: toCapitalize(this.getValueFromKeyTranslate('body.home.campaign-report.income.title'))
    }],
    xAxis: {
      categories: [],
      crosshair: true,
      title: {
        text: toUpperCase(this.getValueFromKeyTranslate('body.home.campaign-report.income.day')),
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          color: '#000000',
          fontWeight: '500'
        },
        align: 'high'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: this.getValueFromKeyTranslate('body.home.campaign-report.income.title') + '(' +
          this.getValueFromKeyTranslate('body.home.campaign-report.income.currency-unit') + ')',
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          color: '#000000',
          fontWeight: '500'
        }
      }
    },
    tooltip: {
      formatter() {
        return '<b>' + this.x + '</b><br/>' + this.series.name + ': <b>' + this.y + '</b>';
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          crop: false,
          style: {
            textOverflow: 'none'
          }
        },
        pointPadding: 0.2,
        borderWidth: 0,
        maxPointWidth: 50
      },
    },
  };

  incomeTypeHightChart: typeof Highcharts = Highcharts;
  updateIncomeType = false;
  incomeTypeChartOption = {
    colors: ['#95CEFF', '#FF7599', '#af11d6', '#1138d6', '#1bd611'],
    chart: {
      type: 'column',
    },
    title: {
      text: this.getValueFromKeyTranslate('body.home.campaign-report.chart.bar-chart') + ' '
        + this.getValueFromKeyTranslate('body.home.campaign-report.income.type'),
      style: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24px',
      }
    },
    series: [{
      data: [],
      type: 'column',
      name: toCapitalize(this.getValueFromKeyTranslate('body.home.campaign-report.table.register'))
    }, {
      data: [],
      type: 'column',
      name: toCapitalize(this.getValueFromKeyTranslate('body.home.campaign-report.table.renew'))
    }],

    xAxis: {
      categories: [],
      crosshair: true,
      title: {
        text: toUpperCase(this.getValueFromKeyTranslate('body.home.campaign-report.income.day')),
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          color: '#000000',
          fontWeight: '500',
        },
        align: 'high'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: this.getValueFromKeyTranslate('body.home.campaign-report.income.title') + '(' +
          this.getValueFromKeyTranslate('body.home.campaign-report.income.currency-unit') + ')',
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          color: '#000000',
          fontWeight: '500'
        }
      }
    },
    tooltip: {
      formatter() {
        return '<b>' + this.x + '</b><br/>' + this.series.name + ': <b>' + this.y + '</b>';
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          crop: false,
          style: {
            textOverflow: 'none'
          }
        },
        pointPadding: 0.2,
        borderWidth: 0,
        maxPointWidth: 50
      },
    },
  };

  constructor(injector: Injector, private readonly campaignService: CampaignService, private readonly activeRoute: ActivatedRoute) {
    super(injector);
    this.getCampaignCode();
  }

  ngOnInit(): void {

  }

  getCampaignCode() {
    const code = this.activeRoute.snapshot.paramMap.get('code');
    console.log(code);
    if (code === null || code === undefined) {
      this.navigate(['/home']).catch(error => {
        console.log(error);
      });
    } else {
      this.code = code;
      this.initCampaignReport();
    }
  }

  getCampaignReport() {
    const startDate = this.campaignReportForm.timeFrom;
    startDate.setHours(0, 0, 0, 0);

    const endDate = this.campaignReportForm.timeTo;
    endDate.setHours(23, 59, 59, 0);

    const campaignReportRequest = new CampaignReportRequest();

    campaignReportRequest.timeFrom = toLocalTime(startDate).getTime();

    campaignReportRequest.timeTo = toLocalTime(endDate).getTime();
    campaignReportRequest.interval = this.campaignReportForm.interval;
    this.campaignService.reportCampaignDetail(campaignReportRequest, this.code).subscribe(res => {
      this.loadingService.hide();
      this.campaignReport = res;
      this.income = this.campaignReport.income;
      this.tracking = this.campaignReport.tracking;
      this.initDataChart();
    });
  }

  initCampaignReport() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    this.campaignReportForm = new CampaignReportForm();
    this.campaignReportForm.timeFrom = startDate;
    this.campaignReportForm.timeTo = endDate;
    this.campaignReportForm.interval = '1d';
    this.getCampaignReport();
  }

  initDataChart() {
    if (this.tracking && this.tracking.os && this.tracking.os.buckets && isArrayHasData(this.tracking.os.buckets)) {
      const dataOS = [];
      this.tracking.os.buckets.forEach(osData => {
        if (typeof osData.key === 'string') {
          dataOS.push({ y: osData.doc_count, name: osData.key });
        }
      });
      this.osChartOptions.series = [{
        data: dataOS, type: 'pie'
      }];
      this.updateOs = true;
    }

    if (this.tracking && this.tracking.isp && this.tracking.isp.buckets && isArrayHasData(this.tracking.isp.buckets)) {
      const dataIsp = [];
      this.tracking.isp.buckets.forEach(ispData => {
        if (typeof ispData.key === 'string') {
          dataIsp.push({ y: ispData.doc_count, name: ispData.key });
        }
      });
      this.ispChartOption.series = [{ data: dataIsp, type: 'pie' }];
      this.updateIsp = true;
    }

    if (this.income && this.income.dateTime && this.income.dateTime.buckets && this.income.dateTime.buckets.length &&
      this.income.dateTime.buckets[0].income) {
      const dataIncomeValue = [];
      const dataLableIncomeValue = [];
      this.income.dateTime.buckets.forEach(incomeValue => {
        dataIncomeValue.push(incomeValue.income.value);
        dataLableIncomeValue.push(moment(toLocalTime(new Date(+incomeValue.key))).format('DD/MM/YYYY'));
      });
      this.incomeValueChartOption.series = [{ type: 'column', data: dataIncomeValue }];
      this.incomeValueChartOption.xAxis = { categories: dataLableIncomeValue };
      this.updateIncomeValue = true;
    }

    if (this.income && this.income.dateTime && this.income.dateTime.buckets && this.income.dateTime.buckets.length &&
      this.income.dateTime.buckets[0].type) {
      const dataIncomeTypeRegister = [];
      const dataIncomeTypeReNew = [];
      const dataLableIncomeType = [];
      this.income.dateTime.buckets.forEach(incomeType => {
        dataIncomeTypeRegister.push(this.getDataIncome(incomeType.type, '1'));
        dataIncomeTypeReNew.push(this.getDataIncome(incomeType.type, '4'));
        dataLableIncomeType.push(moment(toLocalTime(new Date(+incomeType.key))).format('DD/MM/YYYY'));
      });
      this.incomeTypeChartOption.series = [{
        type: 'column',
        data: dataIncomeTypeRegister,
        name: toCapitalize(this.getValueFromKeyTranslate('body.home.campaign-report.table.register'))
      },
      {
        type: 'column',
        data: dataIncomeTypeReNew,
        name: toCapitalize(this.getValueFromKeyTranslate('body.home.campaign-report.table.renew'))
      }];
      this.incomeTypeChartOption.xAxis.categories = dataLableIncomeType;
      this.updateIncomeType = true;
    }
  }

  getDataIncome(type: DataBuckets, key: number | string): number {
    let result = 0;
    if (Array.isArray(type.buckets) && type.buckets.length > 0) {
      type.buckets.forEach((element) => {
        if (element.key === key) {
          result = element.doc_count;
        }
      });
    }
    return result;
  }

}
