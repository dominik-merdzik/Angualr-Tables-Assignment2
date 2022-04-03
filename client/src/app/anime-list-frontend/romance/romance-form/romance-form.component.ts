import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Romance } from '../romance';


@Component({
  selector: 'app-romance-form',
  template: `

  
    <form class="romance-form" autocomplete="off" [formGroup]="romanceForm" (ngSubmit)="submitForm()">
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

      <button class="btn btn-primary" type="submit" [disabled]="romanceForm.invalid">Add</button>
    </form>
  `,
  styles: [
    `.romance-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class RomanceFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Romance> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Romance>();

  @Output()
  formSubmitted = new EventEmitter<Romance>();

  romanceForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() { return this.romanceForm.get('name')!; }
  get position() { return this.romanceForm.get('position')!; }
  get level() { return this.romanceForm.get('level')!; }

  ngOnInit() {
    this.initialState.subscribe(romance => {
      this.romanceForm = this.fb.group({
        name: [ romance.name, [Validators.required] ],
        position: [ romance.position, [ Validators.required, Validators.minLength(5) ] ],
        level: [ romance.level, [Validators.required] ]
      });
    });

    this.romanceForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.romanceForm.value);
  }
}
