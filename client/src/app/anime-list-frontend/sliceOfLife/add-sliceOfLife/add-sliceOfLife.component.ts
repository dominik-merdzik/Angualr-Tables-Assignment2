import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SliceOfLife } from '../sliceOfLife';
import { SliceOfLifeService } from '../sliceOfLife.service';

@Component({
  selector: 'app-add-sliceOfLife',
  template: `
    <h2 class="text-center m-5">Add a New Slice Of Life</h2>
    <app-sliceOfLife-form (formSubmitted)="addSliceOfLife($event)"></app-sliceOfLife-form>
  `
})
export class AddSliceOfLifeComponent {
  constructor(
    private router: Router,
    private SliceOfLifeService: SliceOfLifeService
  ) { }

  addSliceOfLife(sliceOfLife: SliceOfLife) {
    this.SliceOfLifeService.createSliceOfLife(sliceOfLife)
      .subscribe({
        next: () => {
          this.router.navigate(['/sliceOfLifes']);
        },
        error: (error) => {
          alert("Failed to create sliceOfLife");
          console.error(error);
        }
      });
  }
}
