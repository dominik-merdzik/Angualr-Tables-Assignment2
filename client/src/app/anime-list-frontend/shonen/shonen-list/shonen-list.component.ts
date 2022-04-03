import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Shonen } from '../shonen';
import { ShonenService } from '../shonen.service';

@Component({
  selector: 'app-shonens-list',
  template: `
    <h2 class="text-center m-5">Shonen's List</h2>

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
            <tr *ngFor="let shonen of shonens$ | async">
                <td>{{shonen.name}}</td>
                <td>{{shonen.position}}</td>
                <td>{{shonen.level}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', shonen._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteShonen(shonen._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Shonen</button>
  `
})
export class ShonensListComponent implements OnInit {
  shonens$: Observable<Shonen[]> = new Observable();

  constructor(private shonensService: ShonenService) { }

  ngOnInit(): void {
    this.fetchShonens();
  }

  deleteShonen(id: string): void {
    this.shonensService.deleteShonen(id).subscribe({
      next: () => this.fetchShonens()
    });
  }

  private fetchShonens(): void {
    this.shonens$ = this.shonensService.getShonens();
  }
}
