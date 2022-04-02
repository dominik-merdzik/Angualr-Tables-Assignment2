import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Isekai } from '../isekai';


@Component({
  selector: 'app-isekai-form',
  template: `

  
    <form class="isekai-form" autocomplete="off" [formGroup]="isekaiForm" (ngSubmit)="submitForm()">
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

      <button class="btn btn-primary" type="submit" [disabled]="isekaiForm.invalid">Add</button>
    </form>
  `,
  styles: [
    `.isekai-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class IsekaiFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Isekai> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Isekai>();

  @Output()
  formSubmitted = new EventEmitter<Isekai>();

  isekaiForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() { return this.isekaiForm.get('name')!; }
  get position() { return this.isekaiForm.get('position')!; }
  get level() { return this.isekaiForm.get('level')!; }

  ngOnInit() {
    this.initialState.subscribe(isekai => {
      this.isekaiForm = this.fb.group({
        name: [ isekai.name, [Validators.required] ],
        position: [ isekai.position, [ Validators.required, Validators.minLength(5) ] ],
        level: [ isekai.level, [Validators.required] ]
      });
    });

    this.isekaiForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.isekaiForm.value);
  }
}
