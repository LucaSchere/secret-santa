import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomComponent} from "./shared/room/room.component";
import {StartComponent} from "./shared/start/start.component";
import {ConfirmLeaveGuard} from "./core/confirm-leave.guard";

const routes: Routes = [
  { path: 'room', component: RoomComponent, data: {room: ''}, canDeactivate: [ConfirmLeaveGuard] },
  { path: '', component: StartComponent, pathMatch: 'full' },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
