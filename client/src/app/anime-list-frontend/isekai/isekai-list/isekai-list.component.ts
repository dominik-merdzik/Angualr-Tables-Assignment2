import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Isekai } from '../isekai';
import { IsekaiService } from '../isekai.service';

@Component({
  selector: 'app-isekais-list',
  template: `
    <h2 class="text-center m-5">Isekai's List</h2>

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
            <tr *ngFor="let isekai of isekais$ | async">
                <td>{{isekai.name}}</td>
                <td>{{isekai.position}}</td>
                <td>{{isekai.level}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', isekai._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteIsekai(isekai._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Isekai</button>
  `
})
export class IsekaisListComponent implements OnInit {
  isekais$: Observable<Isekai[]> = new Observable();

  constructor(private isekaisService: IsekaiService) { }

  ngOnInit(): void {
    this.fetchIsekais();
  }

  deleteIsekai(id: string): void {
    this.isekaisService.deleteIsekai(id).subscribe({
      next: () => this.fetchIsekais()
    });
  }

  private fetchIsekais(): void {
    this.isekais$ = this.isekaisService.getIsekais();
  }
}
