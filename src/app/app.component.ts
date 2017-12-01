import { Component } from '@angular/core';
import {BpmApplication} from 'ng-bpm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  app: BpmApplication;

  onConnect(app: BpmApplication) {
    this.app = app;
    console.log('app', this.app);
  }
}
