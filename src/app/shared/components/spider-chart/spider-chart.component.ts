import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexChart,
    ApexXAxis,
    ApexFill,
    ChartComponent,
    ApexStroke,
    ApexMarkers,
    NgApexchartsModule,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
} from 'ng-apexcharts';
import { IAssessment } from '../../interfaces/assessment.interface';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    stroke: ApexStroke;
    fill: ApexFill;
    markers: ApexMarkers;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
};

@Component({
    selector: 'app-spider-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './spider-chart.component.html',
    styleUrl: './spider-chart.component.css',
})
export class SpiderChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    chartOptions: Partial<ChartOptions>;

    @Input() assessments: Partial<IAssessment>[] = [];
    @Input() showDegreesOfCertainty: boolean;
    series: ApexAxisChartSeries;

    ngOnInit(): void {
        this.series = [
            {
                name: '',
                data: Array(this.assessments.length).fill(5),
                color: 'rgba(0, 0, 0, 0.0)',
            },
        ];

        if (this.showDegreesOfCertainty) {
            this.series.push({
                name: 'Degree of Certainty',
                data: this.assessments.map((assessment) => assessment.degreeOfCertainty),
            });
        } else {
            this.series.push({
                name: 'Normalized Value',
                data: this.assessments.map((assessment) => assessment.normalized_value),
            });
        }

        this.chartOptions = {
            series: this.series,
            chart: {
                height: 700,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1,
                },
            },
            legend: {
                show: false,
            },
            stroke: {
                width: 1,
            },
            fill: {
                opacity: 0.4,
            },
            markers: {
                size: 5,
            },
            xaxis: {
                categories: this.assessments.map((assessment) => (assessment.is_inverse ? assessment.alternative_description : assessment.indicator)),
            },
            yaxis: {},
        };
    }
}
