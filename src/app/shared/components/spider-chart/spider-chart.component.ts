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
} from 'ng-apexcharts';
import { IAssessment } from '../../interfaces/assessment.interface';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
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
    chartTitle: string = '';

    ngOnInit(): void {
        this.chartOptions = {
            series: [
                {
                    name: '',
                    data: Array(this.assessments.length).fill(5),
                    color: 'rgba(0, 0, 0, 0.0)',
                },
                {
                    name: 'Normalized Value',
                    data: this.assessments.map((assessment) => assessment.normalized_value),
                },
                {
                    name: 'Degree of Certainty',
                    data: this.assessments.map((assessment) => assessment.degreeOfCertainty),
                },
            ],
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
            title: {
                text: this.chartTitle,
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
