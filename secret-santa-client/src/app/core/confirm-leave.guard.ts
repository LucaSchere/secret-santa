import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CanDeactivate} from "@angular/router";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeaveGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate() ?
      true :
      // Todo
      confirm('If you reload this page, you will leave the draw.');
  }

}
