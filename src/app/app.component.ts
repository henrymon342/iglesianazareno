import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iglesiadelnazareno';
  opened: Boolean = false;
  abrir: Boolean = false;

  panelOpenState = false;
}
