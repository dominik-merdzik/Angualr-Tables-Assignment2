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

import { AddIsekaiComponent } from './anime-list-frontend/isekai/add-isekai/add-isekai.component';
import { EditIsekaiComponent } from './anime-list-frontend/isekai/edit-isekai/edit-isekai.component'; // <-- add this line
import { IsekaisListComponent } from './anime-list-frontend/isekai/isekai-list/isekai-list.component';
import { IsekaiFormComponent } from './anime-list-frontend/isekai/isekai-form/isekai-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    
    IsekaisListComponent,
    IsekaiFormComponent,
    AddIsekaiComponent,
    EditIsekaiComponent,

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
