import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SliceOfLife } from '../sliceOfLife';
import { SliceOfLifeService } from '../sliceOfLife.service';

@Component({
  selector: 'app-edit-sliceOfLife.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Slice Of Life</h2>
    <app-sliceOfLife-form [initialState]="sliceOfLife" (formSubmitted)="editSliceOfLife($event)"></app-sliceOfLife-form>
  `
})
export class EditSliceOfLifeComponent implements OnInit {
  sliceOfLife: BehaviorSubject<SliceOfLife> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sliceOfLifeService: SliceOfLifeService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.sliceOfLifeService.getSliceOfLife(id !).subscribe((sliceOfLife) => {
      this.sliceOfLife.next(sliceOfLife);
    });
  }

  editShonen(sliceOfLife: SliceOfLife) {
    this.sliceOfLifeService.updateSliceOfLife(this.sliceOfLife.value._id || '', sliceOfLife)
      .subscribe({
        next: () => {
          this.router.navigate(['/sliceOfLifes']);
        },
        error: (error) => {
          alert('Failed to update sliceOfLife');
          console.error(error);
        }
      })
  }
}
