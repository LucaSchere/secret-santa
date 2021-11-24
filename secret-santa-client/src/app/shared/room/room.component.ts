import {Component, HostListener, OnDestroy} from '@angular/core';
import {WebsocketService} from "../../core/websocket.service";
import {Router} from "@angular/router";
import {ComponentCanDeactivate} from "../../core/confirm-leave.guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnDestroy, ComponentCanDeactivate {

  // Todo
  @HostListener("window:beforeunload")
  canDeactivate = (): boolean | Observable<boolean> => true;

  constructor(public wss: WebsocketService, private router: Router) {
    if (typeof history.state.room === 'undefined') {
      this.router.navigate(['']);
    } else {
      this.wss.connect();
    }
  }

  ngOnDestroy(): void {
    this.wss.disconnect();
  }
}

