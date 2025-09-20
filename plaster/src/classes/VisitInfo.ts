export default class VisitInfo {
    url: string;
    lastVisit: number;
    hideTools: boolean = false;

    host: string;
    id: string | "default" = "default";
    ipUseIdAsHost: boolean;


    constructor(url: string, host: string, lastVisit: number | Date = Date.now(), ipUseIdAsHost = true) {
        this.url = url; // without path and params. 
        this.lastVisit = (typeof lastVisit == "number") ? lastVisit : (lastVisit as Date).getTime();
        this.ipUseIdAsHost = ipUseIdAsHost;
        this.host = host;
    }
}