import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {ComponentCanDeactivate} from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard  {
  canDeactivate(component: ComponentCanDeactivate): boolean {
      return component.canDeactivate();
  }
}