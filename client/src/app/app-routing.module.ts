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

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line

  { path: 'comedys', component: ComedysListComponent },
  { path: 'comedys/new', component: AddComedyComponent }, // <-- add this line
  { path: 'comedys/edit/:id', component: EditComedyComponent }, // <-- add this line

  { path: 'isekais', component: IsekaisListComponent },
  { path: 'isekais/new', component: AddIsekaiComponent }, // <-- add this line
  { path: 'isekais/edit/:id', component: EditIsekaiComponent }]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
