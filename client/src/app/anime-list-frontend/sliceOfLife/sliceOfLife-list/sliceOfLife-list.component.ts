import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SliceOfLife } from '../sliceOfLife';
import { SliceOfLifeService } from '../sliceOfLife.service';

@Component({
  selector: 'app-sliceOfLifes-list',
  template: `
    <h2 class="text-center m-5">Slice of Life's List</h2>

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Anime Name</th>
                <th>Studio</th>
                <th>Maturity Rating</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr *ngFor="let sliceOfLife of sliceOfLifes$ | async">
                <td>{{sliceOfLife.name}}</td>
                <td>{{sliceOfLife.position}}</td>
                <td>{{sliceOfLife.level}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', sliceOfLife._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteSliceOfLife(sliceOfLife._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Slice Of Life</button>
  `
})
export class SliceOfLifesListComponent implements OnInit {
  sliceOfLifes$: Observable<SliceOfLife[]> = new Observable();

  constructor(private sliceOfLifesService: SliceOfLifeService) { }

  ngOnInit(): void {
    this.fetchSliceOfLifes();
  }

  deleteSliceOfLife(id: string): void {
    this.sliceOfLifesService.deleteSliceOfLife(id).subscribe({
      next: () => this.fetchSliceOfLifes()
    });
  }

  private fetchSliceOfLifes(): void {
    this.sliceOfLifes$ = this.sliceOfLifesService.getSliceOfLifes();
  }
}
