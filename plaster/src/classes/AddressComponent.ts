export default class AddressComponent {
    type: 'IPv4' | 'IPv6' | 'Domain';
    host: string;
    port: number | null;

    combine() {
        return `${this.host}:${this.port}`;
    }

    constructor(type: 'IPv4' | 'IPv6' | 'Domain', host: string, port: string | number | null) {
        this.type = type
        this.host = host
        if (typeof port === "string" && port.includes(":")) this.port = parseInt(port.replace(":", ""));
        else if (!port) this.port = null;
        else this.port = parseInt(port as string);
    }
}