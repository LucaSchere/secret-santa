class Client {

    name: string;
    address: string;
    session?: string | string[];

    constructor(name: string, address: string, session?: string | string[]) {
        this.name = name;
        this.address = address;
        this.session = session;
    }
}

export default Client;