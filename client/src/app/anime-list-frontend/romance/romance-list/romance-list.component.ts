import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Romance } from '../romance';
import { RomanceService } from '../romance.service';

@Component({
  selector: 'app-romances-list',
  template: `
    <h2 class="text-center m-5">Romance's List</h2>

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
            <tr *ngFor="let romance of romances$ | async">
                <td>{{romance.name}}</td>
                <td>{{romance.position}}</td>
                <td>{{romance.level}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', romance._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteRomance(romance._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Romance</button>
  `
})
export class RomancesListComponent implements OnInit {
  romances$: Observable<Romance[]> = new Observable();

  constructor(private romancesService: RomanceService) { }

  ngOnInit(): void {
    this.fetchRomances();
  }

  deleteRomance(id: string): void {
    this.romancesService.deleteRomance(id).subscribe({
      next: () => this.fetchRomances()
    });
  }

  private fetchRomances(): void {
    this.romances$ = this.romancesService.getRomances();
  }
}
