import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Comedy } from '../comedy';
import { ComedyService } from '../comedy.service';

@Component({
  selector: 'app-edit-comedy.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Comedy</h2>
    <app-comedy-form [initialState]="comedy" (formSubmitted)="editComedy($event)"></app-comedy-form>
  `
})
export class EditComedyComponent implements OnInit {
  comedy: BehaviorSubject<Comedy> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comedyService: ComedyService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.comedyService.getComedy(id !).subscribe((comedy) => {
      this.comedy.next(comedy);
    });
  }

  editComedy(comedy: Comedy) {
    this.comedyService.updateComedy(this.comedy.value._id || '', comedy)
      .subscribe({
        next: () => {
          this.router.navigate(['/comedys']);
        },
        error: (error) => {
          alert('Failed to update comedy');
          console.error(error);
        }
      })
  }
}
