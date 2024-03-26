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

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  /*
  ngOnInit - lifecycle hook which is called once when the component is initialized
  
  */
  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      
      const id = data['themeId'];// extracts the themeId parameter from the returned observable and assigns it to id

      this.apiService.getTheme(id).subscribe((theme) => {
        this.theme = theme;
        /*
          here we subscribe to the returned parameter from getTheme(id) method and assign it to theme parameter.
        */
      });
    });
  }
}
