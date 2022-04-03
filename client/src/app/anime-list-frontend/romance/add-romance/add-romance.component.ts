import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Romance } from '../romance';
import { RomanceService } from '../romance.service';

@Component({
  selector: 'app-add-romance',
  template: `
    <h2 class="text-center m-5">Add a New Romance</h2>
    <app-romance-form (formSubmitted)="addRomance($event)"></app-romance-form>
  `
})
export class AddRomanceComponent {
  constructor(
    private router: Router,
    private RomanceService: RomanceService
  ) { }

  addRomance(romance: Romance) {
    this.RomanceService.createRomance(romance)
      .subscribe({
        next: () => {
          this.router.navigate(['/romances']);
        },
        error: (error) => {
          alert("Failed to create romance");
          console.error(error);
        }
      });
  }
}
