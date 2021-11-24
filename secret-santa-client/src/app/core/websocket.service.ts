import {Inject, Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {ServerEvents, ClientEvents} from "../config/events";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public clients: any;
  public room: string;
  private socket: Socket<ServerEvents, ClientEvents> | undefined;
  private readonly nick: string;

  constructor() {
    this.room = history.state.room;
    this.nick = history.state.nick;
  }

  public connect = () => {
    console.log('connect');
    this.socket = io('http://localhost:3000',
      {
        query: {
          room: this.room,
          nick: this.nick,
        },
        transports: ['websocket']
      });
    this.listen();
  }

  public disconnect = () => {
    console.log('disconnect');

    this.socket?.disconnect();
  }

  private listen = () => {
    this.socket?.on('user:joined', (params) => {
      console.log('joined');

      this.room = params.room;
      this.clients = params.clients;
    });

    this.socket?.on('user:left', (params) => {
      console.log('disconnect');

      this.room = params.room;
      this.clients = params.clients;
    })
  }
}
