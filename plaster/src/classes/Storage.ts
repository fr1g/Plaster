import VisitInfo from "./VisitInfo";

export interface SameDomain {
    [key: string]: SubSvc;
}

export interface SubSvc {
    [key: string]: VisitInfo;
}

export default class Storage {
    lastVisit: VisitInfo | null = null;
    dictionary: SameDomain = {};

    open(visiting: VisitInfo) {
        const newOne: SubSvc = {};
        this.dictionary[visiting.ipUseIdAsHost ? visiting.id : visiting.host] = newOne;
    }

    put(visiting: VisitInfo, refreshLastVisit = true) {
        if (!this.dictionary[visiting.ipUseIdAsHost ? visiting.id : visiting.host]) this.open(visiting); // nothing exisiting visits under a domain or an addr.
        this.dictionary[visiting.ipUseIdAsHost ? visiting.id : visiting.host][visiting.id] = visiting;
        if (refreshLastVisit) this.lastVisit = visiting;
    }

    delete(host: string, id: string | null = null) { // todo maybe unexpected behaviour 
        if (!id) delete this.dictionary[host];
        else delete this.dictionary[host][id];
    }

}