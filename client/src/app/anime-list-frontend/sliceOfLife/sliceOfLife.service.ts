import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { SliceOfLife } from './sliceOfLife';

@Injectable({
  providedIn: 'root'
})
export class SliceOfLifeService {
  private url = 'http://localhost:5200';
  private sliceOfLifes$: Subject<SliceOfLife[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshSliceOfLifes() {
    this.httpClient.get<SliceOfLife[]>(`${this.url}/sliceOfLifes`)
      .subscribe(sliceOfLifes => {
        this.sliceOfLifes$.next(sliceOfLifes);
      });
  }

  getSliceOfLifes(): Subject<SliceOfLife[]> {
    this.refreshSliceOfLifes();
    return this.sliceOfLifes$;
  }

  getSliceOfLife(id: string): Observable< SliceOfLife > {
    return this.httpClient.get<SliceOfLife>(`${this.url}/sliceOfLifes/${id}`);
  }

  createSliceOfLife(sliceOfLife: SliceOfLife): Observable<string> {
    return this.httpClient.post(`${this.url}/sliceOfLifes`, sliceOfLife, { responseType: 'text' });
  }

  updateSliceOfLife(id: string, sliceOfLife: SliceOfLife): Observable<string> {
    return this.httpClient.put(`${this.url}/sliceOfLifes/${id}`, sliceOfLife, { responseType: 'text' });
  }

  deleteSliceOfLife(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/sliceOfLifes/${id}`, { responseType: 'text' });
  }
}
