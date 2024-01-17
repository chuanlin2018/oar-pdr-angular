import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatacartComponent } from './datacart.component';

/**
 * a guard that protects from leaving or dismissing an open data cart while files are downloading
 */
@Injectable()
export class LeaveWhileDownloadingGuard  {

    canDeactivate(comp : DatacartComponent, currentRoute : ActivatedRouteSnapshot,
                  currentState : RouterStateSnapshot, nextState : RouterStateSnapshot) : boolean
    {
        return comp.canDeactivate();
    }
}
