import type TargetInfo from "./TargetInfo";

export interface SameDomain {
    [key: string]: TargetInfo;
}


export default class Storage {
    lastVisit: TargetInfo | null = null;
    dictionary: SameDomain = {};

    open(visiting: TargetInfo) {
        this.dictionary[visiting.id] = visiting;

        return this;
    }

    save(visiting: TargetInfo, refreshLastVisit = true) {
        if (!this.dictionary[visiting.id]) this.open(visiting); // nothing existing visits under a domain or an addr.
        this.dictionary[visiting.id] = visiting;
        if (refreshLastVisit) this.lastVisit = visiting;

        return this;
    }

    delete(id: string) { // todo maybe unexpected behaviour 
        delete this.dictionary[id];

        return this;
    }

}