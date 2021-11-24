import {Inject, Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {ServerEvents, ClientEvents} from "../config/events";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public clients: any;
  public room: string = '';
  private nick: string = '';
  private socket: Socket<ServerEvents, ClientEvents> | undefined;

  public connect = () => {
    this.room = history.state.room;
    this.nick = history.state.nick;

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
    this.socket?.disconnect();
  }

  public draw() {
    this.socket?.emit('draw', {
      socketId: this.socket.id,
      room: this.room,
    });
  }

  private listen = () => {
    this.socket?.on('user:joined', (params) => {
      this.room = params.room;
      this.clients = params.clients;
    });

    this.socket?.on('user:left', (params) => {
      this.room = params.room;
      this.clients = params.clients;
    })
  }
}
