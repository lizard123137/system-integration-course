import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommoditiesService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${Environment.commoditiesUrl}/time_series?symbol=AAPL,EUR/USD,CBQK&interval=1min&apikey=${Environment.commoditiesKey}`);
  }
}
