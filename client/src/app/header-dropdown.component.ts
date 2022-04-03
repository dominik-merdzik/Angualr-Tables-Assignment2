import {Component} from '@angular/core';

@Component({
  selector: 'header-dropdown',
  template: `
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Tables menu
  </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
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
export class headerDropdown {
}