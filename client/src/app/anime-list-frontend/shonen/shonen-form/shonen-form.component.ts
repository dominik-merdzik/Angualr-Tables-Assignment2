import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Shonen } from '../shonen';


@Component({
  selector: 'app-shonen-form',
  template: `

  
    <form class="shonen-form" autocomplete="off" [formGroup]="shonenForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
        <label for="name">Anime Name</label>
      </div>

      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
        <div *ngIf="name.errors?.['required']">
          Name is required.
        </div>
        <div *ngIf="name.errors?.['minlength']">
          Name must be at least 3 characters long.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="position" placeholder="Position" required>
        <label for="position">Studio Name</label>
      </div>

      <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">

        <div *ngIf="position.errors?.['required']">
          Studio Name is required.
        </div>
        <div *ngIf="position.errors?.['minlength']">
         Studio Name must be at least 5 characters long.
        </div>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
          <label class="form-check-label" for="level-junior">E - Everyone / A - All Ages</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="mid">
          <label class="form-check-label" for="level-mid">T - Teens, Age 13+</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
            value="senior">
          <label class="form-check-label" for="level-senior">M - Mature, Age 18+</label>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="shonenForm.invalid">Add</button>
    </form>
  `,
  styles: [
    `.shonen-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class ShonenFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Shonen> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Shonen>();

  @Output()
  formSubmitted = new EventEmitter<Shonen>();

  shonenForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() { return this.shonenForm.get('name')!; }
  get position() { return this.shonenForm.get('position')!; }
  get level() { return this.shonenForm.get('level')!; }

  ngOnInit() {
    this.initialState.subscribe(shonen => {
      this.shonenForm = this.fb.group({
        name: [ shonen.name, [Validators.required] ],
        position: [ shonen.position, [ Validators.required, Validators.minLength(5) ] ],
        level: [ shonen.level, [Validators.required] ]
      });
    });

    this.shonenForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.shonenForm.value);
  }
}
