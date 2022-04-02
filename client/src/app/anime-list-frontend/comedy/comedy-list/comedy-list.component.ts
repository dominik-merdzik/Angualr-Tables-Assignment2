import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comedy } from '../comedy';
import { ComedyService } from '../comedy.service';

@Component({
  selector: 'app-comedys-list',
  template: `
    <h2 class="text-center m-5">Comedy's List</h2>

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr *ngFor="let comedy of comedys$ | async">
                <td>{{comedy.name}}</td>
                <td>{{comedy.position}}</td>
                <td>{{comedy.level}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', comedy._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteComedy(comedy._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Comedy</button>
  `
})
export class ComedysListComponent implements OnInit {
  comedys$: Observable<Comedy[]> = new Observable();

  constructor(private comedysService: ComedyService) { }

  ngOnInit(): void {
    this.fetchComedys();
  }

  deleteComedy(id: string): void {
    this.comedysService.deleteComedy(id).subscribe({
      next: () => this.fetchComedys()
    });
  }

  private fetchComedys(): void {
    this.comedys$ = this.comedysService.getComedys();
  }
}
