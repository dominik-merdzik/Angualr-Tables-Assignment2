import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Comedy } from './comedy';

@Injectable({
  providedIn: 'root'
})
export class ComedyService {
  private url = 'http://localhost:5200';
  private comedys$: Subject<Comedy[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshComedys() {
    this.httpClient.get<Comedy[]>(`${this.url}/comedys`)
      .subscribe(comedys => {
        this.comedys$.next(comedys);
      });
  }

  getComedys(): Subject<Comedy[]> {
    this.refreshComedys();
    return this.comedys$;
  }

  getComedy(id: string): Observable<Comedy> {
    return this.httpClient.get<Comedy>(`${this.url}/comedys/${id}`);
  }

  createComedy(comedy: Comedy): Observable<string> {
    return this.httpClient.post(`${this.url}/comedys`, comedy, { responseType: 'text' });
  }

  updateComedy(id: string, comedy: Comedy): Observable<string> {
    return this.httpClient.put(`${this.url}/comedys/${id}`, comedy, { responseType: 'text' });
  }

  deleteComedy(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/comedys/${id}`, { responseType: 'text' });
  }
}
