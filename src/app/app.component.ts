import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private translate: TranslateService) {}

  ngOnInit(){
    this.translate.setDefaultLang('hu');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
