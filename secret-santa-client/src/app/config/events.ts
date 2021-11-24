interface userChangeServerParams {
  clients: string[];
  room: string;
}

interface drawClientParams {
  socketId: string;
  room: string;
}

export interface ServerEvents {
  "user:joined": (params: userChangeServerParams) => void;
  "user:left": (params: userChangeServerParams) => void;
}

export interface ClientEvents {
  "draw": (params: drawClientParams) => void;
}
