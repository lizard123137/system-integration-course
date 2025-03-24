import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConflictsService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${Environment.conflictsUrl}?key=${Environment.conflictsKey}&email=${Environment.conflictsEmail}`);
  }
}
