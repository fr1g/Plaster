export default class VisitInfo {
    url: string;
    lastVisit: number;

    host: string;
    id: string | "default" = "default";

    constructor(url: string, lastVisit: number | Date, host: string) {
        this.url = url; // without path and params. 
        this.lastVisit = (typeof lastVisit == "number") ? lastVisit : (lastVisit as Date).getTime();
        this.host = host;
    }
}