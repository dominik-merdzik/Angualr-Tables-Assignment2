import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Shonen } from '../shonen';
import { ShonenService } from '../shonen.service';

@Component({
  selector: 'app-edit-shonen.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Shonen</h2>
    <app-shonen-form [initialState]="shonen" (formSubmitted)="editShonen($event)"></app-shonen-form>
  `
})
export class EditShonenComponent implements OnInit {
  shonen: BehaviorSubject<Shonen> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shonenService: ShonenService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.shonenService.getShonen(id !).subscribe((shonen) => {
      this.shonen.next(shonen);
    });
  }

  editShonen(shonen: Shonen) {
    this.shonenService.updateShonen(this.shonen.value._id || '', shonen)
      .subscribe({
        next: () => {
          this.router.navigate(['/shonens']);
        },
        error: (error) => {
          alert('Failed to update shonen');
          console.error(error);
        }
      })
  }
}
