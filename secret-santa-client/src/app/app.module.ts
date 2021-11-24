import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './shared/room/room.component';
import { StartComponent } from './shared/start/start.component';
import {WebsocketService} from "./core/websocket.service";
import {ConfirmLeaveGuard} from "./core/confirm-leave.guard";

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    WebsocketService,
    ConfirmLeaveGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
