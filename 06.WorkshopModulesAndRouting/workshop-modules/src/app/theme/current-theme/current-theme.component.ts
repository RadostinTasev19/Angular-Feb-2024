import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
  theme = {} as Theme;
// declares a theme property with an empty object that is cast to Theme type
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void { // this is a lifecycle hook method and is called once when the component is initialized
    /*
    -this line subscribes to the params Observable from Activated Route
    - it will execute the provided function whenever the route parameters change.
    - the function receives the route parameters as its argument.
    */
    this.activeRoute.params.subscribe((data) => {
      const id = data['themeId'];
  /*
  this line calls the getTheme method from ApiService with the themeId as an argument
  It then subscribes to the returned Observable.
  this.theme = theme: assigns the response from the getTheme method to the theme property of the component.
  */
      this.apiService.getTheme(id).subscribe((theme) => {
        this.theme = theme;
      });
    });
  }
}
