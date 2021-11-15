import Client from "./Client";

class Session {

    id: string;
    owner: Client;
    clients: Client[];

    constructor(id: string, owner: Client) {
        this.id = id;
        this.owner = owner;
        this.clients = [];
    }

    join(client: Client) {
        this.clients.push(client);
    }


}

export default Session;