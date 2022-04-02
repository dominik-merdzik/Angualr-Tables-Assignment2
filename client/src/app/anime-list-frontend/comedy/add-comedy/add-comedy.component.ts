import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Comedy } from '../comedy';
import { ComedyService } from '../comedy.service';

@Component({
  selector: 'app-add-comedy',
  template: `
    <h2 class="text-center m-5">Add a New Comedy</h2>
    <app-comedy-form (formSubmitted)="addComedy($event)"></app-comedy-form>
  `
})
export class AddComedyComponent {
  constructor(
    private router: Router,
    private ComedyService: ComedyService
  ) { }

  addComedy(comedy: Comedy) {
    this.ComedyService.createComedy(comedy)
      .subscribe({
        next: () => {
          this.router.navigate(['/comedys']);
        },
        error: (error) => {
          alert("Failed to create comedy");
          console.error(error);
        }
      });
  }
}
