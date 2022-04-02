import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Isekai } from '../isekai';
import { IsekaiService } from '../isekai.service';

@Component({
  selector: 'app-add-isekai',
  template: `
    <h2 class="text-center m-5">Add a New Isekai</h2>
    <app-isekai-form (formSubmitted)="addIsekai($event)"></app-isekai-form>
  `
})
export class AddIsekaiComponent {
  constructor(
    private router: Router,
    private IsekaiService: IsekaiService
  ) { }

  addIsekai(isekai: Isekai) {
    this.IsekaiService.createIsekai(isekai)
      .subscribe({
        next: () => {
          this.router.navigate(['/isekais']);
        },
        error: (error) => {
          alert("Failed to create isekai");
          console.error(error);
        }
      });
  }
}
