import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  globals: Globals;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(globals: Globals, private router: Router) {
    this.globals = globals;
  }

  ngOnInit() {
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.globals.logoutUser();
    window.location.reload();
  }
  

}
