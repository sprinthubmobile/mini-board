import { AppService } from './app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'mini-board',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-board';

  constructor(public appService: AppService) { }
}
