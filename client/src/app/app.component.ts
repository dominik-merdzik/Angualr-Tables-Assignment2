import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md">
    <!-- <app-add-employee></app-add-employee> -->
    
    <div mdbDropdown class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      aria-expanded="false"
      mdbDropdownToggle
    >
      table menu
    </button>
    <ul mdbDropdownMenu class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a class="dropdown-item" href="#">Isekai</a></li>
      <li><a class="dropdown-item" href="#">Comedy</a></li>
      <li><a class="dropdown-item" href="#">Shoene</a></li>
      <li><a class="dropdown-item" href="#">slice of life</a></li>
    </ul>
  </div>

    <router-outlet></router-outlet>
  </div>
  `,
  styles: [
    `.dropdown {
      display:flex;
      justify-content:center;
      padding:10px;
    }`
  ]
})
export class AppComponent { }
