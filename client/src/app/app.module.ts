import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'; // <-- add this line
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

import { AddComedyComponent } from './anime-list-frontend/comedy/add-comedy/add-comedy.component';
import { EditComedyComponent } from './anime-list-frontend/comedy/edit-comedy/edit-comedy.component'; // <-- add this line
import { ComedysListComponent } from './anime-list-frontend/comedy/comedy-list/comedy-list.component';
import { ComedyFormComponent } from './anime-list-frontend/comedy/comedy-form/comedy-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,

    ComedysListComponent,
    ComedyFormComponent,
    AddComedyComponent,
    EditComedyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule // <-- add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
