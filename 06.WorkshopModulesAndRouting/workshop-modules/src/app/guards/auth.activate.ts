import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
//this is a decorator used in Angular which marks a class as available to be provided and injected as a dependency
@Injectable({ providedIn: 'root' }) 
  /*providedIn: 'root'
  - this means that the injectable should be provided in the 'root' injector 
    which is the application-level injector in most apps
  - when you provide the service at the root level,
    Angular creates a single shared instance of the service and injects it into any class that asks for it
  In this case AuthActivate is a service that's available application-wide
  */
export class AuthActivate implements CanActivate {
  constructor(private userService: UserService) {}
/*
canActivate 
  - function that is a part of Angular\s routing guards
  - canActivate function checks if the user is logged in by returning this.userService.isLogged
  - decides whether a route can be activated based on certain conditions
  - the function checks if the user is logged in before activating the route
*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userService.isLogged;
  }
}
