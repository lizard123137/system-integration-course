import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { CommoditiesService } from '../../services/commodities.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { ConflictsService } from '../../services/conflicts.service';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, LineController, LineElement, PointElement, TimeScale, Title, Tooltip } from 'chart.js';
import { tap } from 'rxjs';
import 'chartjs-adapter-date-fns';

// Register necessary components for Chart.js
Chart.register(
  BarController,
  BarElement,
  LineController,
  LinearScale,
  CategoryScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  commodities$: any;
  conflicts$: any;

  conflicts: any;
  conflicts_count: number = 0;

  chart = viewChild<ElementRef>("chart");

  constructor(
    private commoditiesService: CommoditiesService,
    private conflictsService: ConflictsService,
  ) {}

  ngOnInit(): void {
    //this.commodities$ = this.commoditiesService.getData()
    this.conflicts$ = this.conflictsService
      .getData()
      .pipe(tap((data: any) => {
        this.conflicts = data["data"];
        this.conflicts_count = data["count"];
        this.updateChart()
    }));


  }

  updateChart() {
    let chartData: any = {
      datasets: [{
        label: 'Conflicts Timeline',
        data: this.conflicts.map((event: any) => ({
          x: new Date(event["event_date"]),
          y: 1,
        })),
      }]
    };

    let chartOptions: ChartOptions = {
      plugins: {
        title: {
          text: 'Chart.js Time Scale',
          display: true,
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'dd-mm-yyyy'
          },
          title: {
            display: true,
            text: 'Event date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'value',
          }
        }
      }
    };
    
    let chartConfig: ChartConfiguration = {
      type: 'line',
      data: chartData,
      options: chartOptions
    };

    new Chart(this.chart()?.nativeElement, chartConfig)
  }
}
