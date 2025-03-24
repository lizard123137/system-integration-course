import { Component, OnInit } from '@angular/core';
import { CommoditiesService } from '../../services/commodities.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { ConflictsService } from '../../services/conflicts.service';

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

  constructor(
    private commoditiesService: CommoditiesService,
    private conflictsService: ConflictsService,
  ) {}

  ngOnInit(): void {
    //this.commodities$ = this.commoditiesService.getData()
    this.conflicts$ = this.conflictsService.getData();
  }
}
