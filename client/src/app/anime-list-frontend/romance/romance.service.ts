import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Romance } from './romance';

@Injectable({
  providedIn: 'root'
})
export class RomanceService {
  private url = 'http://localhost:5200';
  private romances$: Subject<Romance[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshRomances() {
    this.httpClient.get<Romance[]>(`${this.url}/isekais`)
      .subscribe(romances => {
        this.romances$.next(romances);
      });
  }

  getRomances(): Subject<Romance[]> {
    this.refreshRomances();
    return this.romances$;
  }

  getRomance(id: string): Observable<Romance> {
    return this.httpClient.get<Romance>(`${this.url}/romances/${id}`);
  }

  createRomance(romance: Romance): Observable<string> {
    return this.httpClient.post(`${this.url}/romances`, romance, { responseType: 'text' });
  }

  updateRomance(id: string, romance: Romance): Observable<string> {
    return this.httpClient.put(`${this.url}/romances/${id}`, romance, { responseType: 'text' });
  }

  deleteRomance(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/romances/${id}`, { responseType: 'text' });
  }
}
