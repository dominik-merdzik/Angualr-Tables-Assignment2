import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Shonen } from './shonen';

@Injectable({
  providedIn: 'root'
})
export class ShonenService {
  private url = 'http://localhost:5200';
  private shonens$: Subject<Shonen[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshShonens() {
    this.httpClient.get<Shonen[]>(`${this.url}/shonens`)
      .subscribe(shonens => {
        this.shonens$.next(shonens);
      });
  }

  getShonens(): Subject<Shonen[]> {
    this.refreshShonens();
    return this.shonens$;
  }

  getShonen(id: string): Observable<Shonen> {
    return this.httpClient.get<Shonen>(`${this.url}/shonens/${id}`);
  }

  createShonen(shonen: Shonen): Observable<string> {
    return this.httpClient.post(`${this.url}/shonens`, shonen, { responseType: 'text' });
  }

  updateShonen(id: string, shonen: Shonen): Observable<string> {
    return this.httpClient.put(`${this.url}/shonens/${id}`, shonen, { responseType: 'text' });
  }

  deleteShonen(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/shonens/${id}`, { responseType: 'text' });
  }
}
