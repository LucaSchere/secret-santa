import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private router: Router) {
  }

  nick: string = '';
  room: string =  '';

  goToRoom = () => {

    const extras = {state: {room: this.room, nick: this.nick}};

    this.router.navigate(['/room'], extras);
  }

  ngOnInit(): void {
  }

}
