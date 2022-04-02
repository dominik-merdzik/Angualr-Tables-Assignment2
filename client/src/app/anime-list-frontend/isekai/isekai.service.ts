import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Isekai } from './isekai';

@Injectable({
  providedIn: 'root'
})
export class IsekaiService {
  private url = 'http://localhost:5200';
  private isekais$: Subject<Isekai[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshIsekais() {
    this.httpClient.get<Isekai[]>(`${this.url}/isekais`)
      .subscribe(isekais => {
        this.isekais$.next(isekais);
      });
  }

  getIsekais(): Subject<Isekai[]> {
    this.refreshIsekais();
    return this.isekais$;
  }

  getIsekai(id: string): Observable<Isekai> {
    return this.httpClient.get<Isekai>(`${this.url}/isekais/${id}`);
  }

  createIsekai(isekai: Isekai): Observable<string> {
    return this.httpClient.post(`${this.url}/isekais`, isekai, { responseType: 'text' });
  }

  updateIsekai(id: string, isekai: Isekai): Observable<string> {
    return this.httpClient.put(`${this.url}/isekais/${id}`, isekai, { responseType: 'text' });
  }

  deleteIsekai(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/isekais/${id}`, { responseType: 'text' });
  }
}
