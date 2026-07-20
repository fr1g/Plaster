import Base64Helper from "../helpers/base64";

export default class TargetInfo {

    id: string;
    originalCode: string;
    friendlyName: string | null;
    target: string;
    isObjectForNewStoring: boolean;

    isAllEmpty(): boolean {
        return !(this.target || this.id || this.originalCode || this.friendlyName);
    }

    constructor(target: string | null, originalCode: string, id: string | null, friendlyName: string | null, isObjectForNewStoring: boolean = false) {
        this.friendlyName = friendlyName; // nullable
        this.originalCode = originalCode; // original base64 of target
        let realTarget = target ? target : Base64Helper.base64ToString(originalCode);
        this.target = realTarget;
        this.id = id || TargetInfo.generateId(realTarget, originalCode);
        this.isObjectForNewStoring = isObjectForNewStoring;
    }

    static generateId(realTarget: string, originalCode: string): string {
        // auto generate based on the target. usually we have full target like "services.example.com:1145/service" or "114.51.4.191:9810/docs". extract some key words to create a default ID.
        // and maybe we can try to get the target page's title as ID or part of it.
        const keyPart = realTarget.includes("/") ? realTarget.split("/")[1] : null;
        const randomPart = originalCode.substring(0, 5);
        const identifyPart = realTarget.split(".").slice(0, 2).join('.');
        return `${keyPart}_on_${identifyPart}_by_${randomPart}`;
    }

    // if RE and GD both given, verify if they mached.
    // isAllEmpty() {
    //     return !(this.givenDomain || this.givenId || this.paths || this.keyCode || this.resolvedEndpoint);
    // }


}