import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  ngOnInit(): void {
  }

  constructor(){

  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }


  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
