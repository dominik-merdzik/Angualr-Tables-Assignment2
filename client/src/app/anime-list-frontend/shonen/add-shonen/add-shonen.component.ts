import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shonen } from '../shonen';
import { ShonenService } from '../shonen.service';

@Component({
  selector: 'app-add-shonen',
  template: `
    <h2 class="text-center m-5">Add a New Shonen</h2>
    <app-shonen-form (formSubmitted)="addShonen($event)"></app-shonen-form>
  `
})
export class AddShonenComponent {
  constructor(
    private router: Router,
    private ShonenService: ShonenService
  ) { }

  addShonen(shonen: Shonen) {
    this.ShonenService.createShonen(shonen)
      .subscribe({
        next: () => {
          this.router.navigate(['/shonens']);
        },
        error: (error) => {
          alert("Failed to create shonen");
          console.error(error);
        }
      });
  }
}
