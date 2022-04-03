import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md">
    <!-- <app-add-employee></app-add-employee> -->
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent { }
