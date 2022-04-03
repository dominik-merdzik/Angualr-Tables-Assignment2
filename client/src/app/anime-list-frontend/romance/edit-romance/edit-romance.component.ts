import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Romance } from '../romance';
import { RomanceService } from '../romance.service';

@Component({
  selector: 'app-edit-romance.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Romance</h2>
    <app-romance-form [initialState]="romance" (formSubmitted)="editRomance($event)"></app-romance-form>
  `
})
export class EditRomanceComponent implements OnInit {
  romance: BehaviorSubject<Romance> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private romanceService: RomanceService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.romanceService.getRomance(id !).subscribe((romance) => {
      this.romance.next(romance);
    });
  }

  editRomance(romance: Romance) {
    this.romanceService.updateRomance(this.romance.value._id || '', romance)
      .subscribe({
        next: () => {
          this.router.navigate(['/romances']);
        },
        error: (error) => {
          alert('Failed to update romance');
          console.error(error);
        }
      })
  }
}
