interface userChangeServerParams {
  clients: string[];
  room: string;
}


export interface ServerEvents {
  "user:joined": (params: userChangeServerParams) => void;
  "user:left": (params: userChangeServerParams) => void;
  "evaluation": () => void;
}

export interface ClientEvents {
  "user:joined": (callback: (res: Response) => void) => void;
}
