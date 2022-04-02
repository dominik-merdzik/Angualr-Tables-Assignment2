import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Isekai } from '../isekai';
import { IsekaiService } from '../isekai.service';

@Component({
  selector: 'app-edit-isekai.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Isekai</h2>
    <app-isekai-form [initialState]="isekai" (formSubmitted)="editIsekai($event)"></app-isekai-form>
  `
})
export class EditIsekaiComponent implements OnInit {
  isekai: BehaviorSubject<Isekai> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private isekaiService: IsekaiService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.isekaiService.getIsekai(id !).subscribe((isekai) => {
      this.isekai.next(isekai);
    });
  }

  editIsekai(isekai: Isekai) {
    this.isekaiService.updateIsekai(this.isekai.value._id || '', isekai)
      .subscribe({
        next: () => {
          this.router.navigate(['/isekais']);
        },
        error: (error) => {
          alert('Failed to update isekai');
          console.error(error);
        }
      })
  }
}
