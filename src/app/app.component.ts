import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="medium" color="#e65100" type="ball-clip-rotate" [fullScreen]="true">
      <p style="color: white"> Carregando... </p></ngx-spinner>
    <app-footer></app-footer>
    `,
})
export class AppComponent {
  constructor() {

  }
}
