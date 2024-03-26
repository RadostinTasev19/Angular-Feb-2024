import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css'],
})
export class ThemesListComponent implements OnInit {
  /*
  the class implements the ngOnInit lifecycle hook
  ngOninit() must be defined in any class that implements this interface
  
  */
  themes: Theme[] | null = [];// we set themes property to type Theme[] or null and set its value to an empty array
  isLoading: boolean = true;

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
    //this method will return boolean value from service userService
  }

  get userId(): string {
    return this.userService.user?.id || '';
  // this method will return the userService id from service userService
  }

  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      this.themes = themes;
  /*
  this is a lifecycle hook which gets the returned value from getThemes method and subscribes to it.
  then it assigns the returned observable to themes property
  */
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  isSubscribed(theme: Theme) {
    /*
    theme.subscribers - an array of user IDs who are subscribed to the theme.
    find method is used to search this array for a user ID that matches this.userService.user?.id
    
    */
    const isSubscribedUser = theme.subscribers.find((s) => {
      return s === this.userService.user?.id;
      /*
      this function is used to check if the current user is subscribed to a specific theme
      */
    });

    return !!isSubscribedUser;
  }
}
