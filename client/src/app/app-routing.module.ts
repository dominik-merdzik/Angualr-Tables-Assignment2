import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component'; // <-- add this line
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'; // <-- add this line

import { AddComedyComponent } from './anime-list-frontend/comedy/add-comedy/add-comedy.component';
import { EditComedyComponent } from './anime-list-frontend/comedy/edit-comedy/edit-comedy.component'; // <-- add this line
import { ComedysListComponent } from './anime-list-frontend/comedy/comedy-list/comedy-list.component';
import { ComedyFormComponent } from './anime-list-frontend/comedy/comedy-form/comedy-form.component';

import { AddIsekaiComponent } from './anime-list-frontend/isekai/add-isekai/add-isekai.component';
import { EditIsekaiComponent } from './anime-list-frontend/isekai/edit-isekai/edit-isekai.component'; // <-- add this line
import { IsekaisListComponent } from './anime-list-frontend/isekai/isekai-list/isekai-list.component';
import { IsekaiFormComponent } from './anime-list-frontend/isekai/isekai-form/isekai-form.component';

import { AddRomanceComponent } from './anime-list-frontend/romance/add-romance/add-romance.component';
import { EditRomanceComponent } from './anime-list-frontend/romance/edit-romance/edit-romance.component'; // <-- add this line
import { RomancesListComponent } from './anime-list-frontend/romance/romance-list/romance-list.component';
import { RomanceFormComponent } from './anime-list-frontend/romance/romance-form/romance-form.component';

import { AddShonenComponent } from './anime-list-frontend/shonen/add-shonen/add-shonen.component';
import { EditShonenComponent } from './anime-list-frontend/shonen/edit-shonen/edit-shonen.component'; // <-- add this line
import { ShonensListComponent } from './anime-list-frontend/shonen/shonen-list/shonen-list.component';
import { ShonenFormComponent } from './anime-list-frontend/shonen/shonen-form/shonen-form.component';

import { AddSliceOfLifeComponent } from './anime-list-frontend/sliceOfLife/add-sliceOfLife/add-sliceOfLife.component';
import { EditSliceOfLifeComponent } from './anime-list-frontend/sliceOfLife/edit-sliceOfLife/edit-sliceOfLife.component'; // <-- add this line
import { SliceOfLifesListComponent } from './anime-list-frontend/sliceOfLife/sliceOfLife-list/sliceOfLife-list.component';
import { SliceOfLifeFormComponent } from './anime-list-frontend/sliceOfLife/sliceOfLife-form/sliceOfLife-form.component';

//import { headerDropdown } from './header-dropdown.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'comedys', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line

  { path: 'comedys', component: ComedysListComponent },
  { path: 'comedys/new', component: AddComedyComponent }, // <-- add this line
  { path: 'comedys/edit/:id', component: EditComedyComponent }, // <-- add this line

  { path: 'isekais', component: IsekaisListComponent },
  { path: 'isekais/new', component: AddIsekaiComponent }, // <-- add this line
  { path: 'isekais/edit/:id', component: EditIsekaiComponent }, // <-- add this line

  { path: 'romances', component: RomancesListComponent },
  { path: 'romances/new', component: AddRomanceComponent }, // <-- add this line
  { path: 'romances/edit/:id', component: EditRomanceComponent }, // <-- add this line

  { path: 'shonens', component:  ShonensListComponent },
  { path: 'shonens/new', component: AddShonenComponent }, // <-- add this line
  { path: 'shonens/edit/:id', component: EditShonenComponent }, // <-- add this line

  { path: 'sliceOfLifes', component: SliceOfLifesListComponent },
  { path: 'sliceOfLifes/new', component: AddSliceOfLifeComponent }, // <-- add this line
  { path: 'sliceOfLifes/edit/:id', component: EditSliceOfLifeComponent }]; // <-- add this line
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
