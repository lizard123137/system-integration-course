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
    // inter = 1 means that we are looking for state sponsored forces
    // For now use only europe
    // More info about filtering at https://developer.acleddata.com/rehd/cms/views/acled_api/documents/API-User-Guide.pdf
    return this.http.get(`${Environment.conflictsUrl}?key=${Environment.conflictsKey}&email=${Environment.conflictsEmail}&inter1=1&inter2=1&region=12`);
  }
}
